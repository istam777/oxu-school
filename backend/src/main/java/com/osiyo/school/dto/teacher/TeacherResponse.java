package com.osiyo.school.dto.teacher;

import java.time.LocalDateTime;

public record TeacherResponse(
        Long id,
        String fullName,
        String role,
        String bio,
        String photoUrl,
        String email,
        String phone,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
