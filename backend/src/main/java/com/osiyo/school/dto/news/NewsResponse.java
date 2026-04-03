package com.osiyo.school.dto.news;

import java.time.LocalDateTime;

public record NewsResponse(
        Long id,
        String title,
        String slug,
        String summary,
        String content,
        String featuredImage,
        String category,
        boolean published,
        LocalDateTime publishedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
