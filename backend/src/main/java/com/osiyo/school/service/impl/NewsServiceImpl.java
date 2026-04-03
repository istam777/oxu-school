package com.osiyo.school.service.impl;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.news.NewsRequest;
import com.osiyo.school.dto.news.NewsResponse;
import com.osiyo.school.entity.News;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.NewsMapper;
import com.osiyo.school.repository.NewsRepository;
import com.osiyo.school.service.NewsService;
import com.osiyo.school.util.PaginationUtil;
import com.osiyo.school.util.SlugUtil;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;

    @Override
    public PagedResponse<NewsResponse> getPublicNews(int page, int size) {
        Page<NewsResponse> newsPage = newsRepository.findByPublishedTrue(
                        PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt", "createdAt")))
                .map(NewsMapper::toResponse);
        return PaginationUtil.fromPage(newsPage);
    }

    @Override
    public NewsResponse getPublicNewsBySlug(String slug) {
        return newsRepository.findBySlugAndPublishedTrue(slug)
                .map(NewsMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Yangilik topilmadi"));
    }

    @Override
    public PagedResponse<NewsResponse> getAdminNews(int page, int size) {
        Page<NewsResponse> newsPage = newsRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")))
                .map(NewsMapper::toResponse);
        return PaginationUtil.fromPage(newsPage);
    }

    @Override
    public NewsResponse createNews(NewsRequest request) {
        News news = new News();
        apply(news, request, null);
        return NewsMapper.toResponse(newsRepository.save(news));
    }

    @Override
    public NewsResponse updateNews(Long id, NewsRequest request) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Yangilik topilmadi"));
        apply(news, request, id);
        return NewsMapper.toResponse(newsRepository.save(news));
    }

    @Override
    public void deleteNews(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Yangilik topilmadi"));
        newsRepository.delete(news);
    }

    private void apply(News news, NewsRequest request, Long currentId) {
        news.setTitle(request.title());
        news.setSlug(resolveSlug(request.slug(), request.title(), currentId));
        news.setSummary(request.summary());
        news.setContent(request.content());
        news.setFeaturedImage(request.featuredImage());
        news.setCategory(request.category());
        news.setPublished(request.published());
        news.setPublishedAt(request.published()
                ? (request.publishedAt() != null ? request.publishedAt() : LocalDateTime.now())
                : null);
    }

    private String resolveSlug(String slugValue, String title, Long currentId) {
        String baseSlug = SlugUtil.toSlug(slugValue == null || slugValue.isBlank() ? title : slugValue);
        String candidate = baseSlug;
        int counter = 1;
        while (true) {
            News existing = newsRepository.findBySlug(candidate).orElse(null);
            if (existing == null || existing.getId().equals(currentId)) {
                return candidate;
            }
            candidate = baseSlug + "-" + counter++;
        }
    }
}
