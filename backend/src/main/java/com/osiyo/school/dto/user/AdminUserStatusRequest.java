package com.osiyo.school.dto.user;

import jakarta.validation.constraints.NotNull;

public record AdminUserStatusRequest(
        @NotNull(message = "Holat majburiy")
        Boolean enabled
) {
}
