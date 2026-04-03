package com.osiyo.school.mapper;

import com.osiyo.school.dto.auth.UserMeResponse;
import com.osiyo.school.entity.User;
import java.util.Set;
import java.util.stream.Collectors;

public final class AuthMapper {

    private AuthMapper() {
    }

    public static UserMeResponse toMeResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .collect(Collectors.toSet());
        return new UserMeResponse(user.getId(), user.getFullName(), user.getUsername(), user.getEmail(), roles);
    }
}
