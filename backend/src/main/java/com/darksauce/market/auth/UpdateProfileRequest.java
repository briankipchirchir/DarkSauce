package com.darksauce.market.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @NotBlank(message = "Use 2 to 24 characters.")
    @Size(min = 2, max = 24, message = "Use 2 to 24 characters.") String displayName) {
}
