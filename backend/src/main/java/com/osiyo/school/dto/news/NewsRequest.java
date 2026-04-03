package com.osiyo.school.dto.news;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record NewsRequest(
        @NotBlank(message = "Sarlavha majburiy") @Size(max = 200) String title,
        @Size(max = 220) String slug,
        @NotBlank(message = "Qisqa tavsif majburiy") @Size(max = 500) String summary,
        @NotBlank(message = "Kontent majburiy") String content,
        String featuredImage,
        @Size(max = 100) String category,
        boolean published,
        LocalDateTime publishedAt
) {
}
