package com.darksauce.market.payment;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final JdbcTemplate jdbc;

    public PaymentService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /** Stores a claim as PENDING. Throws DuplicateKeyException if the txid was already submitted. */
    public UUID submit(UUID userId, String coin, BigDecimal amountUsd, String txid) {
        UUID id = UUID.randomUUID();
        jdbc.update(
            "insert into payment_claims (id, user_id, coin, amount_usd, txid) values (?, ?, ?, ?, ?)",
            id, userId, coin, amountUsd, txid.toLowerCase());
        return id;
    }

    public List<Map<String, Object>> listForUser(UUID userId) {
        return jdbc.queryForList(
            "select id, coin, amount_usd as \"amountUsd\", txid, status, created_at as \"createdAt\" "
                + "from payment_claims where user_id = ? order by created_at desc limit 50",
            userId);
    }

    public List<Map<String, Object>> listByStatus(String status) {
        return jdbc.queryForList(
            "select c.id, u.email, c.coin, c.amount_usd as \"amountUsd\", c.txid, c.status, "
                + "c.created_at as \"createdAt\" "
                + "from payment_claims c join users u on u.id = c.user_id "
                + "where c.status = ? order by c.created_at asc limit 200",
            status);
    }

    /**
     * Approves a PENDING claim and credits the user's balance in one transaction.
     * Returns false if the claim does not exist or was already reviewed, so a double click
     * or a retry can never credit twice.
     */
    @Transactional
    public boolean approve(UUID claimId, UUID adminId, BigDecimal amountOverride) {
        List<Map<String, Object>> rows = jdbc.queryForList(
            "select user_id, amount_usd from payment_claims where id = ? and status = 'PENDING' for update",
            claimId);
        if (rows.isEmpty()) {
            return false;
        }
        UUID userId = (UUID) rows.get(0).get("user_id");
        BigDecimal amount = amountOverride != null ? amountOverride : (BigDecimal) rows.get(0).get("amount_usd");

        jdbc.update(
            "update payment_claims set status = 'APPROVED', amount_usd = ?, reviewed_by = ?, reviewed_at = now() "
                + "where id = ?",
            amount, adminId, claimId);
        jdbc.update("update users set balance = balance + ? where id = ?", amount, userId);
        return true;
    }

    public boolean reject(UUID claimId, UUID adminId) {
        return jdbc.update(
            "update payment_claims set status = 'REJECTED', reviewed_by = ?, reviewed_at = now() "
                + "where id = ? and status = 'PENDING'",
            adminId, claimId) == 1;
    }
}
