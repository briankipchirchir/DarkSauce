package com.darksauce.market.auth;

import java.time.Duration;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.darksauce.market.config.AppProperties;
import com.darksauce.market.user.UserDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

/** The refresh token cookie: HttpOnly, SameSite=Strict, Secure in production, only sent to /api/auth. */
@Component
public class RefreshCookies {

    public static final String NAME = "ds_refresh";
    private static final Duration SESSION_COOKIE_MAX = Duration.ofDays(1);

    private final AppProperties props;

    public RefreshCookies(AppProperties props) {
        this.props = props;
    }

    public ResponseCookie issue(String token, Duration ttl) {
        ResponseCookie.ResponseCookieBuilder b = ResponseCookie.from(NAME, token)
            .httpOnly(true)
            .secure(props.cookieSecure())
            .sameSite("Strict")
            .path("/api/auth");
        // "Remember me" sessions persist; others are browser-session cookies.
        if (ttl.compareTo(SESSION_COOKIE_MAX) > 0) {
            b.maxAge(ttl);
        }
        return b.build();
    }

    public ResponseCookie clear() {
        return ResponseCookie.from(NAME, "")
            .httpOnly(true)
            .secure(props.cookieSecure())
            .sameSite("Strict")
            .path("/api/auth")
            .maxAge(0)
            .build();
    }

    public Optional<String> read(HttpServletRequest req) {
        if (req.getCookies() == null) {
            return Optional.empty();
        }
        for (Cookie c : req.getCookies()) {
            if (NAME.equals(c.getName()) && c.getValue() != null && !c.getValue().isBlank()) {
                return Optional.of(c.getValue());
            }
        }
        return Optional.empty();
    }

    public ResponseEntity<AuthResponse> response(HttpStatus status, AuthService.Session s) {
        return ResponseEntity.status(status)
            .header(HttpHeaders.SET_COOKIE, issue(s.refreshToken(), s.refreshTtl()).toString())
            .body(new AuthResponse(s.accessToken(), JwtService.ACCESS_TTL.toSeconds(), UserDto.from(s.user())));
    }
}
