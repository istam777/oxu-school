package com.osiyo.school.dto.user;

import java.time.LocalDateTime;
import java.util.Set;

public record AdminUserResponse(
        Long id,
        String fullName,
        String username,
        String email,
        boolean enabled,
        Set<String> roles,
        LocalDateTime createdAt
) {
}
