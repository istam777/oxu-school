package com.osiyo.school.controller;

import com.osiyo.school.dto.common.ApiMessageResponse;
import com.osiyo.school.dto.gallery.GalleryRequest;
import com.osiyo.school.dto.gallery.GalleryResponse;
import com.osiyo.school.service.GalleryService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping("/api/gallery")
    public ResponseEntity<List<GalleryResponse>> getPublicGallery(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(galleryService.getPublicGallery(category));
    }

    @GetMapping("/api/admin/gallery")
    public ResponseEntity<List<GalleryResponse>> getAdminGallery() {
        return ResponseEntity.ok(galleryService.getAdminGallery());
    }

    @PostMapping("/api/admin/gallery")
    public ResponseEntity<GalleryResponse> createGalleryItem(@Valid @RequestBody GalleryRequest request) {
        return ResponseEntity.ok(galleryService.createGalleryItem(request));
    }

    @DeleteMapping("/api/admin/gallery/{id}")
    public ResponseEntity<ApiMessageResponse> deleteGalleryItem(@PathVariable Long id) {
        galleryService.deleteGalleryItem(id);
        return ResponseEntity.ok(new ApiMessageResponse("Galereya rasmi o‘chirildi"));
    }
}
