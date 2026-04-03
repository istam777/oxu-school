package com.osiyo.school.service;

import com.osiyo.school.dto.faq.FaqRequest;
import com.osiyo.school.dto.faq.FaqResponse;
import java.util.List;

public interface FaqService {
    List<FaqResponse> getPublicFaqs(String category);
    List<FaqResponse> getAdminFaqs();
    FaqResponse createFaq(FaqRequest request);
    FaqResponse updateFaq(Long id, FaqRequest request);
    void deleteFaq(Long id);
}
