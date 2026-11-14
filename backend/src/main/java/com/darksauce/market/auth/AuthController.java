package com.darksauce.market.auth;

import java.time.Duration;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darksauce.market.common.ApiException;
import com.darksauce.market.common.RateLimiter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Duration LOGIN_WINDOW = Duration.ofMinutes(15);

    private final AuthService auth;
    private final RefreshCookies cookies;
    private final RateLimiter limiter;

    public AuthController(AuthService auth, RefreshCookies cookies, RateLimiter limiter) {
        this.auth = auth;
        this.cookies = cookies;
        this.limiter = limiter;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req, HttpServletRequest http) {
        limiter.require("register:" + http.getRemoteAddr(), 5, Duration.ofHours(1));
        return cookies.response(HttpStatus.CREATED, auth.register(req.email(), req.password(), req.displayName()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req, HttpServletRequest http) {
        limiter.require("login-ip:" + http.getRemoteAddr(), 20, LOGIN_WINDOW);
        limiter.require("login-email:" + req.email().trim().toLowerCase(Locale.ROOT), 10, LOGIN_WINDOW);
        boolean remember = Boolean.TRUE.equals(req.remember());
        return cookies.response(HttpStatus.OK, auth.login(req.email(), req.password(), remember));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest http) {
        requireAjaxHeader(http);
        Optional<AuthService.Session> session = cookies.read(http).flatMap(auth::refresh);
        if (session.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .header(HttpHeaders.SET_COOKIE, cookies.clear().toString())
                .body(Map.of("error", "unauthorized", "message", "Please sign in again."));
        }
        return cookies.response(HttpStatus.OK, session.get());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest http) {
        requireAjaxHeader(http);
        cookies.read(http).ifPresent(auth::logout);
        return ResponseEntity.noContent()
            .header(HttpHeaders.SET_COOKIE, cookies.clear().toString())
            .build();
    }

    /** Extra CSRF defence for the cookie-based endpoints: a plain cross-site form can't set this header. */
    private static void requireAjaxHeader(HttpServletRequest http) {
        if (!"darksauce".equals(http.getHeader("X-Requested-With"))) {
            throw new ApiException(HttpStatus.FORBIDDEN, "forbidden", "Forbidden.");
        }
    }
}
