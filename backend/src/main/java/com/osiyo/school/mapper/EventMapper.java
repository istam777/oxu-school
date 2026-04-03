package com.osiyo.school.mapper;

import com.osiyo.school.dto.event.EventResponse;
import com.osiyo.school.entity.Event;

public final class EventMapper {

    private EventMapper() {
    }

    public static EventResponse toResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getSlug(),
                event.getSummary(),
                event.getDescription(),
                event.getFeaturedImage(),
                event.getCategory(),
                event.getEventDate(),
                event.getStartTime(),
                event.getEndTime(),
                event.getLocation(),
                event.isPublished(),
                event.getCreatedAt(),
                event.getUpdatedAt()
        );
    }
}
