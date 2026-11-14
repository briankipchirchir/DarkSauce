package com.darksauce.market.payment;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darksauce.market.auth.AuthUser;
import com.darksauce.market.common.RateLimiter;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    record ClaimRequest(
            @NotBlank String coin,
            @NotNull @DecimalMin("5") @DecimalMax("10000") BigDecimal amountUsd,
            @NotBlank @Pattern(regexp = "^[0-9a-fA-F]{64}$", message = "Enter a valid transaction ID.") String txid) {
    }

    private final PaymentService payments;
    private final RateLimiter limiter;

    public PaymentController(PaymentService payments, RateLimiter limiter) {
        this.payments = payments;
        this.limiter = limiter;
    }

    @PostMapping("/claims")
    public ResponseEntity<?> submit(@AuthenticationPrincipal AuthUser me, @Valid @RequestBody ClaimRequest req) {
        limiter.require("claim:" + me.id(), 5, Duration.ofMinutes(15));

        if (!"BTC".equalsIgnoreCase(req.coin())) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "validation", "message", "That coin is not accepted."));
        }
        try {
            UUID id = payments.submit(me.id(), "BTC", req.amountUsd(), req.txid());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", id, "status", "PENDING"));
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "duplicate", "message", "This transaction was already submitted."));
        }
    }

    /** The signed-in user's own claims, newest first. */
    @GetMapping("/claims")
    public List<Map<String, Object>> mine(@AuthenticationPrincipal AuthUser me) {
        return payments.listForUser(me.id());
    }
}
