package com.osiyo.school.service.impl;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.event.EventRequest;
import com.osiyo.school.dto.event.EventResponse;
import com.osiyo.school.entity.Event;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.EventMapper;
import com.osiyo.school.repository.EventRepository;
import com.osiyo.school.service.EventService;
import com.osiyo.school.util.PaginationUtil;
import com.osiyo.school.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public PagedResponse<EventResponse> getPublicEvents(int page, int size) {
        Page<EventResponse> eventPage = eventRepository.findByPublishedTrue(
                        PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "eventDate")))
                .map(EventMapper::toResponse);
        return PaginationUtil.fromPage(eventPage);
    }

    @Override
    public EventResponse getPublicEventBySlug(String slug) {
        return eventRepository.findBySlugAndPublishedTrue(slug)
                .map(EventMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Tadbir topilmadi"));
    }

    @Override
    public PagedResponse<EventResponse> getAdminEvents(int page, int size) {
        Page<EventResponse> eventPage = eventRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "eventDate")))
                .map(EventMapper::toResponse);
        return PaginationUtil.fromPage(eventPage);
    }

    @Override
    public EventResponse createEvent(EventRequest request) {
        Event event = new Event();
        apply(event, request, null);
        return EventMapper.toResponse(eventRepository.save(event));
    }

    @Override
    public EventResponse updateEvent(Long id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tadbir topilmadi"));
        apply(event, request, id);
        return EventMapper.toResponse(eventRepository.save(event));
    }

    @Override
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tadbir topilmadi"));
        eventRepository.delete(event);
    }

    private void apply(Event event, EventRequest request, Long currentId) {
        event.setTitle(request.title());
        event.setSlug(resolveSlug(request.slug(), request.title(), currentId));
        event.setSummary(request.summary());
        event.setDescription(request.description());
        event.setFeaturedImage(request.featuredImage());
        event.setCategory(request.category());
        event.setEventDate(request.eventDate());
        event.setStartTime(request.startTime());
        event.setEndTime(request.endTime());
        event.setLocation(request.location());
        event.setPublished(request.published());
    }

    private String resolveSlug(String slugValue, String title, Long currentId) {
        String baseSlug = SlugUtil.toSlug(slugValue == null || slugValue.isBlank() ? title : slugValue);
        String candidate = baseSlug;
        int counter = 1;
        while (true) {
            Event existing = eventRepository.findBySlug(candidate).orElse(null);
            if (existing == null || existing.getId().equals(currentId)) {
                return candidate;
            }
            candidate = baseSlug + "-" + counter++;
        }
    }
}
