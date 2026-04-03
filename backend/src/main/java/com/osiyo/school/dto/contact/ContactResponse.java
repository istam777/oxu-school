package com.osiyo.school.dto.contact;

import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String fullName,
        String phone,
        String email,
        String subject,
        String message,
        LocalDateTime submittedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
