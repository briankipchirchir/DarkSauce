package com.darksauce.market.user;

import java.math.BigDecimal;
import java.util.UUID;

public record UserDto(UUID id, String email, String displayName, String role, BigDecimal balance) {

    public static UserDto from(User u) {
        return new UserDto(u.getId(), u.getEmail(), u.getDisplayName(), u.getRole(), u.getBalance());
    }
}
