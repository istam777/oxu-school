package com.osiyo.school.dto.gallery;

import java.time.LocalDateTime;

public record GalleryResponse(
        Long id,
        String title,
        String imageUrl,
        String category,
        LocalDateTime uploadedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
