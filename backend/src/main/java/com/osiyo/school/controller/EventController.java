package com.osiyo.school.controller;

import com.osiyo.school.dto.common.ApiMessageResponse;
import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.event.EventRequest;
import com.osiyo.school.dto.event.EventResponse;
import com.osiyo.school.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/api/events")
    public ResponseEntity<PagedResponse<EventResponse>> getPublicEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        return ResponseEntity.ok(eventService.getPublicEvents(page, size));
    }

    @GetMapping("/api/events/{slug}")
    public ResponseEntity<EventResponse> getPublicEventBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(eventService.getPublicEventBySlug(slug));
    }

    @GetMapping("/api/admin/events")
    public ResponseEntity<PagedResponse<EventResponse>> getAdminEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(eventService.getAdminEvents(page, size));
    }

    @PostMapping("/api/admin/events")
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }

    @PutMapping("/api/admin/events/{id}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long id, @Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.updateEvent(id, request));
    }

    @DeleteMapping("/api/admin/events/{id}")
    public ResponseEntity<ApiMessageResponse> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(new ApiMessageResponse("Tadbir o‘chirildi"));
    }
}
