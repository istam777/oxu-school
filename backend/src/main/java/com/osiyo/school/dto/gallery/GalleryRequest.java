package com.osiyo.school.dto.gallery;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GalleryRequest(
        @NotBlank(message = "Sarlavha majburiy") @Size(max = 180) String title,
        @NotBlank(message = "Rasm manzili majburiy") String imageUrl,
        @NotBlank(message = "Kategoriya majburiy") @Size(max = 100) String category
) {
}
