package com.darksauce.market.payment;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darksauce.market.auth.AuthUser;

/** Protected by SecurityConfig: /api/admin/** requires ROLE_ADMIN. */
@RestController
@RequestMapping("/api/admin/payments")
public class AdminPaymentController {

    /** Optional: credit a different amount than the user claimed (for example an underpayment). */
    record ApproveRequest(BigDecimal amountUsd) {
    }

    private final PaymentService payments;

    public AdminPaymentController(PaymentService payments) {
        this.payments = payments;
    }

    @GetMapping("/claims")
    public ResponseEntity<?> list(@RequestParam(defaultValue = "PENDING") String status) {
        String s = status.toUpperCase();
        if (!List.of("PENDING", "APPROVED", "REJECTED").contains(s)) {
            return ResponseEntity.badRequest().body(Map.of("error", "validation", "message", "Unknown status."));
        }
        return ResponseEntity.ok(payments.listByStatus(s));
    }

    @PostMapping("/claims/{id}/approve")
    public ResponseEntity<?> approve(
            @AuthenticationPrincipal AuthUser admin,
            @PathVariable UUID id,
            @RequestBody(required = false) ApproveRequest body) {
        BigDecimal override = body == null ? null : body.amountUsd();
        if (override != null && (override.signum() <= 0 || override.compareTo(new BigDecimal("10000")) > 0)) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "validation", "message", "Amount must be between 0 and 10,000."));
        }
        if (!payments.approve(id, admin.id(), override)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "not_pending", "message", "Claim not found or already reviewed."));
        }
        return ResponseEntity.ok(Map.of("status", "APPROVED"));
    }

    @PostMapping("/claims/{id}/reject")
    public ResponseEntity<?> reject(@AuthenticationPrincipal AuthUser admin, @PathVariable UUID id) {
        if (!payments.reject(id, admin.id())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "not_pending", "message", "Claim not found or already reviewed."));
        }
        return ResponseEntity.ok(Map.of("status", "REJECTED"));
    }
}
