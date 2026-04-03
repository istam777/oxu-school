package com.osiyo.school.dto.homepage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record HomepageSectionRequest(
        @NotBlank(message = "Section key majburiy") @Size(max = 120) String sectionKey,
        @NotBlank(message = "UZ sarlavha majburiy") @Size(max = 200) String titleUz,
        @NotBlank(message = "EN sarlavha majburiy") @Size(max = 200) String titleEn,
        @NotBlank(message = "RU sarlavha majburiy") @Size(max = 200) String titleRu,
        @NotBlank(message = "UZ kontent majburiy") String contentUz,
        @NotBlank(message = "EN kontent majburiy") String contentEn,
        @NotBlank(message = "RU kontent majburiy") String contentRu,
        String imageUrl,
        boolean active
) {
}
