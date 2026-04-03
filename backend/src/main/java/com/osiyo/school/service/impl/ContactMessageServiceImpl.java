package com.osiyo.school.service.impl;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.contact.ContactRequest;
import com.osiyo.school.dto.contact.ContactResponse;
import com.osiyo.school.entity.ContactMessage;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.ContactMapper;
import com.osiyo.school.repository.ContactMessageRepository;
import com.osiyo.school.service.ContactMessageService;
import com.osiyo.school.util.PaginationUtil;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    @Override
    public ContactResponse createMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .fullName(request.fullName())
                .phone(request.phone())
                .email(request.email())
                .subject(request.subject())
                .message(request.message())
                .submittedAt(LocalDateTime.now())
                .build();
        return ContactMapper.toResponse(contactMessageRepository.save(message));
    }

    @Override
    public PagedResponse<ContactResponse> getMessages(int page, int size) {
        Page<ContactResponse> messages = contactMessageRepository.findAllByOrderBySubmittedAtDesc(PageRequest.of(page, size))
                .map(ContactMapper::toResponse);
        return PaginationUtil.fromPage(messages);
    }

    @Override
    public ContactResponse getMessage(Long id) {
        return contactMessageRepository.findById(id)
                .map(ContactMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Xabar topilmadi"));
    }
}
