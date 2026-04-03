package com.osiyo.school.service;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.event.EventRequest;
import com.osiyo.school.dto.event.EventResponse;

public interface EventService {
    PagedResponse<EventResponse> getPublicEvents(int page, int size);
    EventResponse getPublicEventBySlug(String slug);
    PagedResponse<EventResponse> getAdminEvents(int page, int size);
    EventResponse createEvent(EventRequest request);
    EventResponse updateEvent(Long id, EventRequest request);
    void deleteEvent(Long id);
}
