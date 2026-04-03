package com.osiyo.school.dto.teacher;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TeacherRequest(
        @NotBlank(message = "To‘liq ism majburiy") @Size(max = 160) String fullName,
        @NotBlank(message = "Lavozim majburiy") @Size(max = 120) String role,
        @NotBlank(message = "Bio majburiy") String bio,
        String photoUrl,
        @Size(max = 160) String email,
        @Size(max = 60) String phone
) {
}
