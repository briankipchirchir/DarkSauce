package com.darksauce.market.auth;

import java.util.UUID;

/** The authenticated caller, taken from a verified access token. */
public record AuthUser(UUID id, String role) {
}
