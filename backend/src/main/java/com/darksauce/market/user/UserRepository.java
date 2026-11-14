package com.darksauce.market.user;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, UUID> {

    @Query("select u from User u where lower(u.email) = lower(:email)")
    Optional<User> findByEmail(@Param("email") String email);

    /** Atomic: counts the failure and locks the account when the limit is reached. */
    @Modifying
    @Transactional
    @Query(value = """
        UPDATE users SET
          failed_logins = CASE WHEN failed_logins + 1 >= :max THEN 0 ELSE failed_logins + 1 END,
          locked_until  = CASE WHEN failed_logins + 1 >= :max THEN CAST(:lockUntil AS timestamptz) ELSE locked_until END,
          updated_at = now()
        WHERE id = :id
        """, nativeQuery = true)
    int registerFailure(@Param("id") UUID id, @Param("max") int max, @Param("lockUntil") Instant lockUntil);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE users SET failed_logins = 0, locked_until = NULL, updated_at = now()
        WHERE id = :id AND (failed_logins <> 0 OR locked_until IS NOT NULL)
        """, nativeQuery = true)
    int clearFailures(@Param("id") UUID id);
}
