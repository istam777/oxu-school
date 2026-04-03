package com.osiyo.school.mapper;

import com.osiyo.school.dto.contact.ContactResponse;
import com.osiyo.school.entity.ContactMessage;

public final class ContactMapper {

    private ContactMapper() {
    }

    public static ContactResponse toResponse(ContactMessage message) {
        return new ContactResponse(
                message.getId(),
                message.getFullName(),
                message.getPhone(),
                message.getEmail(),
                message.getSubject(),
                message.getMessage(),
                message.getSubmittedAt(),
                message.getCreatedAt(),
                message.getUpdatedAt()
        );
    }
}
