package com.darksauce.market.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

import org.junit.jupiter.api.Test;

import com.darksauce.market.config.AppProperties;

class JwtServiceTest {

    private static final String SECRET = "test-secret-test-secret-test-secret-123456";

    private static JwtService service(String secret) {
        return new JwtService(new AppProperties("http://localhost:5173", secret, false));
    }

    @Test
    void roundTripKeepsUserAndRole() {
        JwtService jwt = service(SECRET);
        UUID id = UUID.randomUUID();
        AuthUser parsed = jwt.parse(jwt.create(id, "ADMIN")).orElseThrow();
        assertThat(parsed.id()).isEqualTo(id);
        assertThat(parsed.role()).isEqualTo("ADMIN");
    }

    @Test
    void forgedPayloadIsRejected() {
        JwtService jwt = service(SECRET);
        String[] parts = jwt.create(UUID.randomUUID(), "USER").split("\\.");
        String payload = Base64.getUrlEncoder().withoutPadding().encodeToString(
            ("{\"sub\":\"" + UUID.randomUUID() + "\",\"role\":\"ADMIN\"}").getBytes(StandardCharsets.UTF_8));
        assertThat(jwt.parse(parts[0] + "." + payload + "." + parts[2])).isEmpty();
    }

    @Test
    void tokenFromAnotherKeyIsRejected() {
        String token = service("another-secret-another-secret-another-1234").create(UUID.randomUUID(), "USER");
        assertThat(service(SECRET).parse(token)).isEmpty();
    }

    @Test
    void garbageIsRejected() {
        assertThat(service(SECRET).parse("not-a-jwt")).isEmpty();
    }

    @Test
    void shortOrMissingSecretStopsStartup() {
        assertThatThrownBy(() -> service("too-short")).isInstanceOf(IllegalStateException.class);
        assertThatThrownBy(() -> service("")).isInstanceOf(IllegalStateException.class);
        assertThatThrownBy(() -> service(null)).isInstanceOf(IllegalStateException.class);
    }
}
