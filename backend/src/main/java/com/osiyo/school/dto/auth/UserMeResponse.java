package com.osiyo.school.dto.auth;

import java.util.Set;

public record UserMeResponse(
        Long id,
        String fullName,
        String username,
        String email,
        Set<String> roles
) {
}
