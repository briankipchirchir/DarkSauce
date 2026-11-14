package com.darksauce.market.auth;

import com.darksauce.market.user.UserDto;

public record AuthResponse(String accessToken, long expiresIn, UserDto user) {
}
