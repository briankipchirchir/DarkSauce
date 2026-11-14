package com.darksauce.market.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Enter a valid email address.")
    @Email(message = "Enter a valid email address.")
    @Size(max = 254, message = "Enter a valid email address.") String email,

    @NotBlank(message = "Password must be 8 to 72 characters.")
    @Size(min = 8, max = 72, message = "Password must be 8 to 72 characters.") String password,

    @NotBlank(message = "Display name must be 2 to 24 characters.")
    @Size(min = 2, max = 24, message = "Display name must be 2 to 24 characters.") String displayName) {
}
