package com.osiyo.school.controller;

import com.osiyo.school.dto.common.ApiMessageResponse;
import com.osiyo.school.dto.faq.FaqRequest;
import com.osiyo.school.dto.faq.FaqResponse;
import com.osiyo.school.service.FaqService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    @GetMapping("/api/faqs")
    public ResponseEntity<List<FaqResponse>> getPublicFaqs(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(faqService.getPublicFaqs(category));
    }

    @GetMapping("/api/admin/faqs")
    public ResponseEntity<List<FaqResponse>> getAdminFaqs() {
        return ResponseEntity.ok(faqService.getAdminFaqs());
    }

    @PostMapping("/api/admin/faqs")
    public ResponseEntity<FaqResponse> createFaq(@Valid @RequestBody FaqRequest request) {
        return ResponseEntity.ok(faqService.createFaq(request));
    }

    @PutMapping("/api/admin/faqs/{id}")
    public ResponseEntity<FaqResponse> updateFaq(@PathVariable Long id, @Valid @RequestBody FaqRequest request) {
        return ResponseEntity.ok(faqService.updateFaq(id, request));
    }

    @DeleteMapping("/api/admin/faqs/{id}")
    public ResponseEntity<ApiMessageResponse> deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return ResponseEntity.ok(new ApiMessageResponse("FAQ o‘chirildi"));
    }
}
