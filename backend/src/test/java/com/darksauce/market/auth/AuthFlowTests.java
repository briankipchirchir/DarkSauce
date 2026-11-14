package com.darksauce.market.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.Cookie;

@SpringBootTest(properties = "app.jwt-secret=test-secret-test-secret-test-secret-123456")
@AutoConfigureMockMvc
@Testcontainers(disabledWithoutDocker = true)
class AuthFlowTests {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    private static final String PW = "correct horse 1";

    @Autowired MockMvc mvc;
    @Autowired JdbcTemplate jdbc;

    private final ObjectMapper json = new ObjectMapper();
    // each test gets its own client IP so the per-IP rate limits don't interfere with each other
    private final String ip = "10." + ThreadLocalRandom.current().nextInt(1, 250) + "."
        + ThreadLocalRandom.current().nextInt(1, 250) + ".7";

    private record Reg(String email, String token, String cookie) {
    }

    private ResultActions call(HttpMethod method, String path, Object body, String bearer, String refresh)
            throws Exception {
        MockHttpServletRequestBuilder b = request(method, path)
            .contentType(MediaType.APPLICATION_JSON)
            .header("X-Requested-With", "darksauce")
            .with(r -> {
                r.setRemoteAddr(ip);
                return r;
            });
        if (body != null) {
            b.content(json.writeValueAsString(body));
        }
        if (bearer != null) {
            b.header("Authorization", "Bearer " + bearer);
        }
        if (refresh != null) {
            b.cookie(new Cookie("ds_refresh", refresh));
        }
        return mvc.perform(b);
    }

    private String token(MvcResult r) throws Exception {
        return json.readTree(r.getResponse().getContentAsString()).get("accessToken").asText();
    }

    private String cookie(MvcResult r) {
        Cookie c = r.getResponse().getCookie("ds_refresh");
        return c == null ? null : c.getValue();
    }

    private Reg register() throws Exception {
        String email = "u" + UUID.randomUUID() + "@example.com";
        MvcResult r = call(HttpMethod.POST, "/api/auth/register",
            Map.of("email", email, "password", PW, "displayName", "Tester"), null, null)
            .andExpect(status().isCreated()).andReturn();
        return new Reg(email, token(r), cookie(r));
    }

    private ResultActions login(String email, String password) throws Exception {
        return call(HttpMethod.POST, "/api/auth/login", Map.of("email", email, "password", password), null, null);
    }

    @Test
    void registerGivesTokenAndHardenedCookie() throws Exception {
        String email = "u" + UUID.randomUUID() + "@example.com";
        MvcResult r = call(HttpMethod.POST, "/api/auth/register",
            Map.of("email", email, "password", PW, "displayName", "Tester"), null, null)
            .andExpect(status().isCreated()).andReturn();
        String setCookie = r.getResponse().getHeader("Set-Cookie");
        assertThat(setCookie).contains("HttpOnly").contains("SameSite=Strict").contains("Path=/api/auth");

        call(HttpMethod.GET, "/api/me", null, token(r), null)
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.role").value("USER"))
            .andExpect(jsonPath("$.email").value(email));
    }

    @Test
    void meRequiresAToken() throws Exception {
        call(HttpMethod.GET, "/api/me", null, null, null).andExpect(status().isUnauthorized());
        call(HttpMethod.GET, "/api/me", null, "garbage", null).andExpect(status().isUnauthorized());
    }

    @Test
    void duplicateEmailIsRejected() throws Exception {
        Reg u = register();
        call(HttpMethod.POST, "/api/auth/register",
            Map.of("email", u.email().toUpperCase(), "password", PW, "displayName", "Again"), null, null)
            .andExpect(status().isConflict());
    }

    @Test
    void unknownEmailAndWrongPasswordLookIdentical() throws Exception {
        Reg u = register();
        String a = login("nobody" + UUID.randomUUID() + "@example.com", "whatever-123")
            .andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
        String b = login(u.email(), "wrong-password-1")
            .andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
        assertThat(a).isEqualTo(b);
    }

    @Test
    void fiveFailuresLockTheAccountEvenForTheRightPassword() throws Exception {
        Reg u = register();
        for (int i = 0; i < 5; i++) {
            login(u.email(), "wrong-password-1").andExpect(status().isUnauthorized());
        }
        login(u.email(), PW).andExpect(status().isUnauthorized());
        Integer locked = jdbc.queryForObject(
            "select count(*) from users where email = ? and locked_until > now()", Integer.class, u.email());
        assertThat(locked).isEqualTo(1);
    }

    @Test
    void refreshRotatesAndOldTokenStopsWorking() throws Exception {
        Reg u = register();
        MvcResult r2 = call(HttpMethod.POST, "/api/auth/refresh", null, null, u.cookie())
            .andExpect(status().isOk()).andReturn();
        String second = cookie(r2);
        assertThat(second).isNotNull().isNotEqualTo(u.cookie());

        // immediate reuse of the old token (e.g. two tabs) is refused but does not kill the session
        call(HttpMethod.POST, "/api/auth/refresh", null, null, u.cookie()).andExpect(status().isUnauthorized());
        call(HttpMethod.POST, "/api/auth/refresh", null, null, second).andExpect(status().isOk());
    }

    @Test
    void replayingAnOldTokenRevokesTheWholeSession() throws Exception {
        Reg u = register();
        MvcResult r2 = call(HttpMethod.POST, "/api/auth/refresh", null, null, u.cookie())
            .andExpect(status().isOk()).andReturn();
        String second = cookie(r2);

        // pretend the first token was used long ago
        jdbc.update("update refresh_tokens set revoked_at = now() - interval '1 minute' "
            + "where revoked_at is not null and user_id = (select id from users where email = ?)", u.email());

        call(HttpMethod.POST, "/api/auth/refresh", null, null, u.cookie()).andExpect(status().isUnauthorized());
        call(HttpMethod.POST, "/api/auth/refresh", null, null, second).andExpect(status().isUnauthorized());
    }

    @Test
    void refreshAndLogoutNeedTheAjaxHeader() throws Exception {
        Reg u = register();
        mvc.perform(post("/api/auth/refresh").cookie(new Cookie("ds_refresh", u.cookie())))
            .andExpect(status().isForbidden());
        mvc.perform(post("/api/auth/logout").cookie(new Cookie("ds_refresh", u.cookie())))
            .andExpect(status().isForbidden());
    }

    @Test
    void logoutEndsTheSession() throws Exception {
        Reg u = register();
        call(HttpMethod.POST, "/api/auth/logout", null, null, u.cookie()).andExpect(status().isNoContent());
        call(HttpMethod.POST, "/api/auth/refresh", null, null, u.cookie()).andExpect(status().isUnauthorized());
    }

    @Test
    void passwordChangeSignsOtherDevicesOut() throws Exception {
        Reg u = register();
        MvcResult otherDevice = login(u.email(), PW).andExpect(status().isOk()).andReturn();

        call(HttpMethod.POST, "/api/me/password",
            Map.of("currentPassword", PW, "newPassword", "a brand new pass 9"), u.token(), null)
            .andExpect(status().isOk());

        call(HttpMethod.POST, "/api/auth/refresh", null, null, cookie(otherDevice)).andExpect(status().isUnauthorized());
        login(u.email(), PW).andExpect(status().isUnauthorized());
        login(u.email(), "a brand new pass 9").andExpect(status().isOk());
    }

    @Test
    void wrongCurrentPasswordIsRefused() throws Exception {
        Reg u = register();
        call(HttpMethod.POST, "/api/me/password",
            Map.of("currentPassword", "not my password", "newPassword", "a brand new pass 9"), u.token(), null)
            .andExpect(status().isBadRequest());
    }

    @Test
    void normalUsersCannotReachAdminRoutes() throws Exception {
        Reg u = register();
        call(HttpMethod.GET, "/api/admin/deposits", null, u.token(), null).andExpect(status().isForbidden());
        call(HttpMethod.GET, "/api/admin/deposits", null, null, null).andExpect(status().isUnauthorized());
    }
}
