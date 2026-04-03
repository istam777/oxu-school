package com.osiyo.school.dto.event;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record EventResponse(
        Long id,
        String title,
        String slug,
        String summary,
        String description,
        String featuredImage,
        String category,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        String location,
        boolean published,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
