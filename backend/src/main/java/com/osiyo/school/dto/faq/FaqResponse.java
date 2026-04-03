package com.osiyo.school.dto.faq;

import java.time.LocalDateTime;

public record FaqResponse(
        Long id,
        String question,
        String answer,
        String category,
        Integer sortOrder,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
