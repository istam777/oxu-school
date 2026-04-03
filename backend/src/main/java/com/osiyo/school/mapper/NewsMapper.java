package com.osiyo.school.mapper;

import com.osiyo.school.dto.news.NewsResponse;
import com.osiyo.school.entity.News;

public final class NewsMapper {

    private NewsMapper() {
    }

    public static NewsResponse toResponse(News news) {
        return new NewsResponse(
                news.getId(),
                news.getTitle(),
                news.getSlug(),
                news.getSummary(),
                news.getContent(),
                news.getFeaturedImage(),
                news.getCategory(),
                news.isPublished(),
                news.getPublishedAt(),
                news.getCreatedAt(),
                news.getUpdatedAt()
        );
    }
}
