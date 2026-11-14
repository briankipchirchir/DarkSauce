package com.darksauce.market.common;

import java.time.Duration;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.LongSupplier;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/**
 * Small in-memory sliding-window limiter. Fine for one backend instance; if you run several
 * instances, move this to a shared store (phase 6).
 */
@Component
public class RateLimiter {

    private static final long SWEEP_MAX_AGE_MS = Duration.ofHours(1).toMillis();

    private final Map<String, Deque<Long>> hits = new ConcurrentHashMap<>();
    private final LongSupplier clock;

    public RateLimiter() {
        this(System::currentTimeMillis);
    }

    RateLimiter(LongSupplier clock) {
        this.clock = clock;
    }

    /** Records a hit and returns true if it is within the limit. */
    public boolean tryAcquire(String key, int max, Duration window) {
        long now = clock.getAsLong();
        long windowMs = window.toMillis();
        if (hits.size() > 50_000) {
            hits.values().removeIf(q -> {
                synchronized (q) {
                    return q.isEmpty() || now - q.peekLast() > SWEEP_MAX_AGE_MS;
                }
            });
        }
        Deque<Long> q = hits.computeIfAbsent(key, k -> new ArrayDeque<>());
        synchronized (q) {
            while (!q.isEmpty() && now - q.peekFirst() >= windowMs) {
                q.pollFirst();
            }
            if (q.size() >= max) {
                return false;
            }
            q.addLast(now);
            return true;
        }
    }

    /** Throws 429 when the limit is exceeded. */
    public void require(String key, int max, Duration window) {
        if (!tryAcquire(key, max, window)) {
            throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "rate_limited",
                "Too many attempts. Please try again later.");
        }
    }
}
