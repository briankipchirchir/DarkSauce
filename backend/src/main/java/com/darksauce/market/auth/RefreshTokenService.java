package com.darksauce.market.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * Refresh tokens are random, stored only as SHA-256 hashes, and rotated on every use.
 * Presenting an already-used token after the 10 second grace period (two tabs refreshing at once)
 * is treated as theft and revokes the whole session family.
 */
@Service
public class RefreshTokenService {

    private static final Logger log = LoggerFactory.getLogger(RefreshTokenService.class);
    private static final SecureRandom RANDOM = new SecureRandom();

    public record Rotated(UUID userId, String token, Duration ttl) {
    }

    private record Row(UUID id, UUID userId, UUID familyId, boolean revoked, boolean replay, Duration ttl) {
    }

    private final JdbcTemplate jdbc;
    private final TransactionTemplate tx;

    public RefreshTokenService(JdbcTemplate jdbc, PlatformTransactionManager tm) {
        this.jdbc = jdbc;
        this.tx = new TransactionTemplate(tm);
    }

    /** Starts a new session family and returns the raw token (shown to the client once, never stored). */
    public String issue(UUID userId, Duration ttl) {
        String raw = newToken();
        insert(UUID.randomUUID(), userId, UUID.randomUUID(), hash(raw), ttl);
        return raw;
    }

    public Optional<Rotated> rotate(String raw) {
        List<Row> rows = jdbc.query("""
            SELECT id, user_id, family_id,
                   (revoked_at IS NOT NULL) AS revoked,
                   (revoked_at IS NOT NULL AND revoked_at < now() - interval '10 seconds') AS replay,
                   EXTRACT(EPOCH FROM (expires_at - created_at)) AS ttl
            FROM refresh_tokens WHERE token_hash = ?
            """,
            (rs, i) -> new Row(
                rs.getObject("id", UUID.class),
                rs.getObject("user_id", UUID.class),
                rs.getObject("family_id", UUID.class),
                rs.getBoolean("revoked"),
                rs.getBoolean("replay"),
                Duration.ofSeconds(rs.getBigDecimal("ttl").longValue())),
            hash(raw));
        if (rows.isEmpty()) {
            return Optional.empty();
        }
        Row r = rows.get(0);
        if (r.replay()) {
            jdbc.update("UPDATE refresh_tokens SET revoked_at = now() WHERE family_id = ? AND revoked_at IS NULL",
                r.familyId());
            log.warn("Refresh token reuse detected, session family revoked (user {})", r.userId());
            return Optional.empty();
        }
        if (r.revoked()) {
            return Optional.empty();
        }
        return tx.execute(status -> {
            int claimed = jdbc.update(
                "UPDATE refresh_tokens SET revoked_at = now() WHERE id = ? AND revoked_at IS NULL AND expires_at > now()",
                r.id());
            if (claimed == 0) {
                return Optional.<Rotated>empty();
            }
            String next = newToken();
            UUID nextId = UUID.randomUUID();
            insert(nextId, r.userId(), r.familyId(), hash(next), r.ttl());
            jdbc.update("UPDATE refresh_tokens SET replaced_by = ? WHERE id = ?", nextId, r.id());
            return Optional.of(new Rotated(r.userId(), next, r.ttl()));
        });
    }

    /** Logout: ends the whole session family this token belongs to. */
    public void revokeFamilyOf(String raw) {
        jdbc.update("""
            UPDATE refresh_tokens SET revoked_at = now()
            WHERE revoked_at IS NULL
              AND family_id = (SELECT family_id FROM refresh_tokens WHERE token_hash = ?)
            """, hash(raw));
    }

    public void revokeAll(UUID userId) {
        jdbc.update("UPDATE refresh_tokens SET revoked_at = now() WHERE user_id = ? AND revoked_at IS NULL", userId);
    }

    private void insert(UUID id, UUID userId, UUID familyId, String tokenHash, Duration ttl) {
        jdbc.update("""
            INSERT INTO refresh_tokens (id, user_id, token_hash, family_id, expires_at)
            VALUES (?, ?, ?, ?, now() + make_interval(secs => ?))
            """, id, userId, tokenHash, familyId, (double) ttl.toSeconds());
    }

    private static String newToken() {
        byte[] b = new byte[32];
        RANDOM.nextBytes(b);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(b);
    }

    static String hash(String raw) {
        try {
            byte[] d = MessageDigest.getInstance("SHA-256").digest(raw.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(d);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
