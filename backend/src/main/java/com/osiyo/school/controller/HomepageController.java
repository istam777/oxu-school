package com.osiyo.school.controller;

import com.osiyo.school.dto.homepage.HomepageSectionRequest;
import com.osiyo.school.dto.homepage.HomepageSectionResponse;
import com.osiyo.school.dto.homepage.SettingRequest;
import com.osiyo.school.dto.homepage.SettingResponse;
import com.osiyo.school.service.HomepageSectionService;
import com.osiyo.school.service.SettingService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HomepageController {

    private final HomepageSectionService homepageSectionService;
    private final SettingService settingService;

    @GetMapping("/api/homepage/sections")
    public ResponseEntity<List<HomepageSectionResponse>> getPublicSections() {
        return ResponseEntity.ok(homepageSectionService.getPublicSections());
    }

    @GetMapping("/api/admin/homepage/sections")
    public ResponseEntity<List<HomepageSectionResponse>> getAdminSections() {
        return ResponseEntity.ok(homepageSectionService.getAdminSections());
    }

    @PutMapping("/api/admin/homepage/sections/{id}")
    public ResponseEntity<HomepageSectionResponse> updateSection(
            @PathVariable Long id,
            @Valid @RequestBody HomepageSectionRequest request
    ) {
        return ResponseEntity.ok(homepageSectionService.updateSection(id, request));
    }

    @GetMapping("/api/settings/public")
    public ResponseEntity<List<SettingResponse>> getPublicSettings() {
        return ResponseEntity.ok(settingService.getPublicSettings());
    }

    @GetMapping("/api/admin/settings")
    public ResponseEntity<List<SettingResponse>> getAdminSettings() {
        return ResponseEntity.ok(settingService.getAdminSettings());
    }

    @PutMapping("/api/admin/settings/{id}")
    public ResponseEntity<SettingResponse> updateSetting(
            @PathVariable Long id,
            @Valid @RequestBody SettingRequest request
    ) {
        return ResponseEntity.ok(settingService.updateSetting(id, request));
    }
}
