package com.osiyo.school.repository;

import com.osiyo.school.entity.GalleryImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByCategoryIgnoreCaseOrderByUploadedAtDesc(String category);
    List<GalleryImage> findAllByOrderByUploadedAtDesc();
}
