package com.osiyo.school.controller;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.contact.ContactRequest;
import com.osiyo.school.dto.contact.ContactResponse;
import com.osiyo.school.service.ContactMessageService;
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
public class ContactController {

    private final ContactMessageService contactMessageService;

    @PostMapping("/api/contact")
    public ResponseEntity<ContactResponse> createMessage(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactMessageService.createMessage(request));
    }

    @GetMapping("/api/admin/messages")
    public ResponseEntity<PagedResponse<ContactResponse>> getMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(contactMessageService.getMessages(page, size));
    }

    @GetMapping("/api/admin/messages/{id}")
    public ResponseEntity<ContactResponse> getMessage(@PathVariable Long id) {
        return ResponseEntity.ok(contactMessageService.getMessage(id));
    }
}
