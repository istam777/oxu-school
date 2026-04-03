package com.osiyo.school.service;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.news.NewsRequest;
import com.osiyo.school.dto.news.NewsResponse;

public interface NewsService {
    PagedResponse<NewsResponse> getPublicNews(int page, int size);
    NewsResponse getPublicNewsBySlug(String slug);
    PagedResponse<NewsResponse> getAdminNews(int page, int size);
    NewsResponse createNews(NewsRequest request);
    NewsResponse updateNews(Long id, NewsRequest request);
    void deleteNews(Long id);
}
