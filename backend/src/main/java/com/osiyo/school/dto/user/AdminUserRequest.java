package com.osiyo.school.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminUserRequest(
        @NotBlank(message = "To'liq ism majburiy")
        @Size(max = 150, message = "To'liq ism 150 belgidan oshmasligi kerak")
        String fullName,

        @NotBlank(message = "Username majburiy")
        @Size(max = 100, message = "Username 100 belgidan oshmasligi kerak")
        String username,

        @NotBlank(message = "Email majburiy")
        @Email(message = "Email formati noto'g'ri")
        @Size(max = 150, message = "Email 150 belgidan oshmasligi kerak")
        String email,

        @NotBlank(message = "Parol majburiy")
        @Size(min = 8, message = "Parol kamida 8 belgidan iborat bo'lishi kerak")
        String password,

        @NotBlank(message = "Rol tanlanishi kerak")
        @Pattern(regexp = "ROLE_ADMIN|ROLE_EDITOR", message = "Faqat admin yoki editor roli tanlanishi mumkin")
        String role
) {
}
