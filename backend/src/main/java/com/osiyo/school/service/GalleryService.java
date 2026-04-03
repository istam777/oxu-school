package com.osiyo.school.service;

import com.osiyo.school.dto.gallery.GalleryRequest;
import com.osiyo.school.dto.gallery.GalleryResponse;
import java.util.List;

public interface GalleryService {
    List<GalleryResponse> getPublicGallery(String category);
    List<GalleryResponse> getAdminGallery();
    GalleryResponse createGalleryItem(GalleryRequest request);
    void deleteGalleryItem(Long id);
}
