package com.osiyo.school.dto.auth;

public record AuthResponse(String token, UserMeResponse user) {
}
