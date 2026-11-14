package com.darksauce.market.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
    @NotBlank(message = "Enter your current password.")
    @Size(max = 72, message = "Current password is incorrect.") String currentPassword,

    @NotBlank(message = "New password must be 8 to 72 characters.")
    @Size(min = 8, max = 72, message = "New password must be 8 to 72 characters.") String newPassword) {
}
