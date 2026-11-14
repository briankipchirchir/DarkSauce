package com.darksauce.market.common;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicLong;

import org.junit.jupiter.api.Test;

class RateLimiterTest {

    @Test
    void blocksAfterTheLimitAndRecoversAfterTheWindow() {
        AtomicLong now = new AtomicLong(0);
        RateLimiter limiter = new RateLimiter(now::get);
        Duration window = Duration.ofMinutes(1);

        assertThat(limiter.tryAcquire("a", 2, window)).isTrue();
        assertThat(limiter.tryAcquire("a", 2, window)).isTrue();
        assertThat(limiter.tryAcquire("a", 2, window)).isFalse();
        assertThat(limiter.tryAcquire("b", 2, window)).isTrue();   // other keys are independent

        now.set(61_000);
        assertThat(limiter.tryAcquire("a", 2, window)).isTrue();
    }

    @Test
    void requireThrowsTooManyRequests() {
        RateLimiter limiter = new RateLimiter(() -> 0L);
        limiter.require("k", 1, Duration.ofMinutes(1));
        assertThatThrownBy(() -> limiter.require("k", 1, Duration.ofMinutes(1)))
            .isInstanceOf(ApiException.class)
            .hasMessageContaining("Too many attempts");
    }
}
