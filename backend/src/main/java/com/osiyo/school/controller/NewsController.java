package com.osiyo.school.controller;

import com.osiyo.school.dto.common.ApiMessageResponse;
import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.news.NewsRequest;
import com.osiyo.school.dto.news.NewsResponse;
import com.osiyo.school.service.NewsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/api/news")
    public ResponseEntity<PagedResponse<NewsResponse>> getPublicNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        return ResponseEntity.ok(newsService.getPublicNews(page, size));
    }

    @GetMapping("/api/news/{slug}")
    public ResponseEntity<NewsResponse> getPublicNewsBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(newsService.getPublicNewsBySlug(slug));
    }

    @GetMapping("/api/admin/news")
    public ResponseEntity<PagedResponse<NewsResponse>> getAdminNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(newsService.getAdminNews(page, size));
    }

    @PostMapping("/api/admin/news")
    public ResponseEntity<NewsResponse> createNews(@Valid @RequestBody NewsRequest request) {
        return ResponseEntity.ok(newsService.createNews(request));
    }

    @PutMapping("/api/admin/news/{id}")
    public ResponseEntity<NewsResponse> updateNews(@PathVariable Long id, @Valid @RequestBody NewsRequest request) {
        return ResponseEntity.ok(newsService.updateNews(id, request));
    }

    @DeleteMapping("/api/admin/news/{id}")
    public ResponseEntity<ApiMessageResponse> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok(new ApiMessageResponse("Yangilik o‘chirildi"));
    }
}
