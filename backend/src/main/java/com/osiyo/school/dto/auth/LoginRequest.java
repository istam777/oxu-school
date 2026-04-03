package com.osiyo.school.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Login majburiy") String username,
        @NotBlank(message = "Parol majburiy") String password
) {
}
