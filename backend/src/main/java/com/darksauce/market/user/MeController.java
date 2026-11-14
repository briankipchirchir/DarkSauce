package com.darksauce.market.user;

import java.time.Duration;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darksauce.market.auth.AuthResponse;
import com.darksauce.market.auth.AuthService;
import com.darksauce.market.auth.AuthUser;
import com.darksauce.market.auth.ChangePasswordRequest;
import com.darksauce.market.auth.RefreshCookies;
import com.darksauce.market.auth.UpdateProfileRequest;
import com.darksauce.market.common.RateLimiter;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final AuthService auth;
    private final RefreshCookies cookies;
    private final RateLimiter limiter;

    public MeController(AuthService auth, RefreshCookies cookies, RateLimiter limiter) {
        this.auth = auth;
        this.cookies = cookies;
        this.limiter = limiter;
    }

    @GetMapping
    public UserDto me(@AuthenticationPrincipal AuthUser me) {
        return UserDto.from(auth.get(me.id()));
    }

    @PatchMapping
    public UserDto update(@AuthenticationPrincipal AuthUser me, @Valid @RequestBody UpdateProfileRequest req) {
        return UserDto.from(auth.updateDisplayName(me.id(), req.displayName()));
    }

    /** Changes the password, signs every other device out, and gives this device a fresh session. */
    @PostMapping("/password")
    public ResponseEntity<AuthResponse> changePassword(
            @AuthenticationPrincipal AuthUser me, @Valid @RequestBody ChangePasswordRequest req) {
        limiter.require("pw:" + me.id(), 5, Duration.ofMinutes(15));
        return cookies.response(HttpStatus.OK, auth.changePassword(me.id(), req.currentPassword(), req.newPassword()));
    }
}
