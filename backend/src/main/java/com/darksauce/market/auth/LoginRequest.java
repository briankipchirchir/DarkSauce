package com.darksauce.market.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
    @NotBlank(message = "Enter your email and password.")
    @Size(max = 254, message = "Invalid email or password.") String email,

    @NotBlank(message = "Enter your email and password.")
    @Size(max = 72, message = "Invalid email or password.") String password,

    Boolean remember) {
}
