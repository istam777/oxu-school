package com.osiyo.school.repository;

import com.osiyo.school.entity.News;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findBySlug(String slug);
    Optional<News> findBySlugAndPublishedTrue(String slug);
    boolean existsBySlug(String slug);
    Page<News> findByPublishedTrue(Pageable pageable);
}
