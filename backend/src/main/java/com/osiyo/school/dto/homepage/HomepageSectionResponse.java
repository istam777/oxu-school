package com.osiyo.school.dto.homepage;

import java.time.LocalDateTime;

public record HomepageSectionResponse(
        Long id,
        String sectionKey,
        String titleUz,
        String titleEn,
        String titleRu,
        String contentUz,
        String contentEn,
        String contentRu,
        String imageUrl,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
