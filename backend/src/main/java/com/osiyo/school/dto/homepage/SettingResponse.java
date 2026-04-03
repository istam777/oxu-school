package com.osiyo.school.dto.homepage;

import java.time.LocalDateTime;

public record SettingResponse(
        Long id,
        String settingKey,
        String settingValue,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
