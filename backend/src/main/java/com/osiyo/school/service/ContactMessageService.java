package com.osiyo.school.service;

import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.dto.contact.ContactRequest;
import com.osiyo.school.dto.contact.ContactResponse;

public interface ContactMessageService {
    ContactResponse createMessage(ContactRequest request);
    PagedResponse<ContactResponse> getMessages(int page, int size);
    ContactResponse getMessage(Long id);
}
