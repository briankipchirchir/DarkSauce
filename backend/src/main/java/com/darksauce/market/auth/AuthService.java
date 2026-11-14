package com.darksauce.market.auth;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.darksauce.market.common.ApiException;
import com.darksauce.market.user.User;
import com.darksauce.market.user.UserRepository;

@Service
public class AuthService {

    private static final int MAX_FAILURES = 5;
    private static final Duration LOCK_TIME = Duration.ofMinutes(15);
    static final Duration REMEMBER_TTL = Duration.ofDays(30);
    static final Duration SESSION_TTL = Duration.ofDays(1);

    public record Session(User user, String accessToken, String refreshToken, Duration refreshTtl) {
    }

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final RefreshTokenService refreshTokens;
    /** Compared against when the account doesn't exist, so response time doesn't reveal it. */
    private final String dummyHash;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt, RefreshTokenService refreshTokens) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
        this.refreshTokens = refreshTokens;
        this.dummyHash = encoder.encode("not-a-real-password");
    }

    public Session register(String rawEmail, String password, String displayName) {
        String email = normalize(rawEmail);
        String name = displayName.trim();
        checkName(name);
        checkPassword(password, "Password must be 8 to 72 characters.");
        if (users.findByEmail(email).isPresent()) {
            throw emailTaken();
        }
        User u = new User();
        u.setEmail(email);
        u.setPasswordHash(encoder.encode(password));
        u.setDisplayName(name);
        try {
            u = users.saveAndFlush(u);
        } catch (DataIntegrityViolationException e) {
            throw emailTaken();
        }
        return startSession(u, true);
    }

    public Session login(String rawEmail, String password, boolean remember) {
        String email = normalize(rawEmail);
        User user = users.findByEmail(email).orElse(null);
        Instant now = Instant.now();
        boolean locked = user != null && user.getLockedUntil() != null && user.getLockedUntil().isAfter(now);
        boolean tooLong = password.getBytes(StandardCharsets.UTF_8).length > 72;

        if (user == null || locked || tooLong) {
            encoder.matches(tooLong ? "x" : password, dummyHash);
            throw badLogin();
        }
        if (!encoder.matches(password, user.getPasswordHash())) {
            users.registerFailure(user.getId(), MAX_FAILURES, now.plus(LOCK_TIME));
            throw badLogin();
        }
        users.clearFailures(user.getId());
        return startSession(user, remember);
    }

    public Optional<Session> refresh(String rawToken) {
        return refreshTokens.rotate(rawToken).flatMap(r ->
            users.findById(r.userId()).map(u ->
                new Session(u, jwt.create(u.getId(), u.getRole()), r.token(), r.ttl())));
    }

    public void logout(String rawToken) {
        refreshTokens.revokeFamilyOf(rawToken);
    }

    public User get(UUID id) {
        return users.findById(id).orElseThrow(() ->
            new ApiException(HttpStatus.UNAUTHORIZED, "unauthorized", "Please sign in again."));
    }

    public User updateDisplayName(UUID id, String displayName) {
        String name = displayName.trim();
        checkName(name);
        User u = get(id);
        u.setDisplayName(name);
        return users.save(u);
    }

    public Session changePassword(UUID id, String current, String next) {
        User u = get(id);
        if (current.getBytes(StandardCharsets.UTF_8).length > 72 || !encoder.matches(current, u.getPasswordHash())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "wrong_password", "Current password is incorrect.");
        }
        checkPassword(next, "New password must be 8 to 72 characters.");
        u.setPasswordHash(encoder.encode(next));
        u = users.save(u);
        refreshTokens.revokeAll(u.getId());          // every device must sign in again
        return startSession(u, true);                // this device gets a fresh session
    }

    private Session startSession(User u, boolean remember) {
        Duration ttl = remember ? REMEMBER_TTL : SESSION_TTL;
        String refreshToken = refreshTokens.issue(u.getId(), ttl);
        return new Session(u, jwt.create(u.getId(), u.getRole()), refreshToken, ttl);
    }

    private static String normalize(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private static void checkName(String name) {
        if (name.length() < 2 || name.length() > 24) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "validation", "Use 2 to 24 characters.");
        }
    }

    /** bcrypt only reads the first 72 bytes, so longer passwords are refused instead of silently cut. */
    private static void checkPassword(String password, String message) {
        int bytes = password.getBytes(StandardCharsets.UTF_8).length;
        if (password.length() < 8 || bytes > 72) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "validation", message);
        }
    }

    private static ApiException badLogin() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "invalid_credentials", "Invalid email or password.");
    }

    private static ApiException emailTaken() {
        return new ApiException(HttpStatus.CONFLICT, "email_taken", "An account with this email already exists.");
    }
}
