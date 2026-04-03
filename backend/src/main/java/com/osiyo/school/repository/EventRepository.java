package com.osiyo.school.repository;

import com.osiyo.school.entity.Event;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findBySlug(String slug);
    Optional<Event> findBySlugAndPublishedTrue(String slug);
    boolean existsBySlug(String slug);
    Page<Event> findByPublishedTrue(Pageable pageable);
}
