package com.osiyo.school.dto.homepage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SettingRequest(
        @NotBlank(message = "Kalit majburiy") @Size(max = 150) String settingKey,
        @NotBlank(message = "Qiymat majburiy") String settingValue
) {
}
