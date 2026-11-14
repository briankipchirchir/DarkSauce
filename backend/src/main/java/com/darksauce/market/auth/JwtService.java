package com.darksauce.market.auth;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.darksauce.market.config.AppProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    public static final Duration ACCESS_TTL = Duration.ofMinutes(15);

    private final SecretKey key;

    public JwtService(AppProperties props) {
        byte[] bytes = props.jwtSecret() == null ? new byte[0] : props.jwtSecret().getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException(
                "JWT_SECRET must be set and at least 32 characters. Generate one with: openssl rand -base64 48");
        }
        this.key = Keys.hmacShaKeyFor(bytes);
    }

    public String create(UUID userId, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
            .subject(userId.toString())
            .claim("role", role)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(ACCESS_TTL)))
            .signWith(key, Jwts.SIG.HS256)
            .compact();
    }

    public Optional<AuthUser> parse(String token) {
        try {
            Claims c = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
            String role = c.get("role", String.class);
            if (role == null) {
                return Optional.empty();
            }
            return Optional.of(new AuthUser(UUID.fromString(c.getSubject()), role));
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}
