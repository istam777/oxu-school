package com.osiyo.school.service.impl;

import com.osiyo.school.dto.gallery.GalleryRequest;
import com.osiyo.school.dto.gallery.GalleryResponse;
import com.osiyo.school.entity.GalleryImage;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.GalleryMapper;
import com.osiyo.school.repository.GalleryImageRepository;
import com.osiyo.school.service.GalleryService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

    private final GalleryImageRepository galleryImageRepository;

    @Override
    public List<GalleryResponse> getPublicGallery(String category) {
        List<GalleryImage> items = category == null || category.isBlank()
                ? galleryImageRepository.findAllByOrderByUploadedAtDesc()
                : galleryImageRepository.findByCategoryIgnoreCaseOrderByUploadedAtDesc(category);
        return items.stream().map(GalleryMapper::toResponse).toList();
    }

    @Override
    public List<GalleryResponse> getAdminGallery() {
        return galleryImageRepository.findAllByOrderByUploadedAtDesc().stream()
                .map(GalleryMapper::toResponse)
                .toList();
    }

    @Override
    public GalleryResponse createGalleryItem(GalleryRequest request) {
        GalleryImage image = GalleryImage.builder()
                .title(request.title())
                .imageUrl(request.imageUrl())
                .category(request.category())
                .uploadedAt(LocalDateTime.now())
                .build();
        return GalleryMapper.toResponse(galleryImageRepository.save(image));
    }

    @Override
    public void deleteGalleryItem(Long id) {
        GalleryImage image = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Galereya rasmi topilmadi"));
        galleryImageRepository.delete(image);
    }
}
