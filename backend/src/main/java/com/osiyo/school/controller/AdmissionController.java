package com.osiyo.school.controller;

import com.osiyo.school.dto.admission.AdmissionRequest;
import com.osiyo.school.dto.admission.AdmissionResponse;
import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.service.AdmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdmissionController {

    private final AdmissionService admissionService;

    @PostMapping("/api/admissions")
    public ResponseEntity<AdmissionResponse> createAdmission(@Valid @RequestBody AdmissionRequest request) {
        return ResponseEntity.ok(admissionService.createAdmission(request));
    }

    @GetMapping("/api/admin/admissions")
    public ResponseEntity<PagedResponse<AdmissionResponse>> getAdmissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(admissionService.getAdmissions(page, size));
    }

    @GetMapping("/api/admin/admissions/{id}")
    public ResponseEntity<AdmissionResponse> getAdmission(@PathVariable Long id) {
        return ResponseEntity.ok(admissionService.getAdmission(id));
    }
}
