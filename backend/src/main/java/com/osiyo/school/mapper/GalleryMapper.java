package com.osiyo.school.mapper;

import com.osiyo.school.dto.gallery.GalleryResponse;
import com.osiyo.school.entity.GalleryImage;

public final class GalleryMapper {

    private GalleryMapper() {
    }

    public static GalleryResponse toResponse(GalleryImage image) {
        return new GalleryResponse(
                image.getId(),
                image.getTitle(),
                image.getImageUrl(),
                image.getCategory(),
                image.getUploadedAt(),
                image.getCreatedAt(),
                image.getUpdatedAt()
        );
    }
}
