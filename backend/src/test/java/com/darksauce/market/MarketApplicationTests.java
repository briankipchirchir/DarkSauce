package com.darksauce.market;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers(disabledWithoutDocker = true)
class MarketApplicationTests {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired
    JdbcTemplate jdbc;

    @Autowired
    TestRestTemplate rest;

    @Test
    void migrationsCreateEveryTableWithRowLevelSecurity() {
        Integer rlsTables = jdbc.queryForObject("""
            SELECT count(*) FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
            WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relrowsecurity
              AND c.relname IN ('users','refresh_tokens','categories','products','cart_items',
                                'orders','order_items','payment_methods','deposits',
                                'balance_ledger','audit_log')
            """, Integer.class);
        assertThat(rlsTables).isEqualTo(11);

        Integer policies = jdbc.queryForObject(
            "SELECT count(*) FROM pg_policies WHERE schemaname = 'public'", Integer.class);
        assertThat(policies).isZero();
    }

    @Test
    void seedDataMatchesDataJs() {
        assertThat(jdbc.queryForObject("SELECT count(*) FROM categories", Integer.class)).isEqualTo(5);
        assertThat(jdbc.queryForObject("SELECT count(*) FROM products", Integer.class)).isEqualTo(12);
        assertThat(jdbc.queryForObject("SELECT count(*) FROM payment_methods", Integer.class)).isEqualTo(6);
        assertThat(jdbc.queryForObject("SELECT price FROM products WHERE id = 6", java.math.BigDecimal.class))
            .isEqualByComparingTo("100.00");
        assertThat(jdbc.queryForObject(
            "SELECT count(*) FROM payment_methods WHERE wallet_address IS NOT NULL", Integer.class)).isZero();
    }

    @Test
    void negativeBalanceIsRejectedByTheDatabase() {
        assertThatThrownBy(() -> jdbc.update(
            "INSERT INTO users (email, password_hash, display_name, balance) VALUES (?, ?, ?, ?)",
            "neg@example.com", "x", "neg", new java.math.BigDecimal("-1.00")))
            .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void healthIsPublicAndReportsDatabase() {
        ResponseEntity<String> res = rest.getForEntity("/api/health", String.class);
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(res.getBody()).contains("\"status\":\"UP\"").contains("\"database\":\"UP\"");
    }

    @Test
    void everythingElseRequiresAuthentication() {
        ResponseEntity<String> res = rest.getForEntity("/api/products", String.class);
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
