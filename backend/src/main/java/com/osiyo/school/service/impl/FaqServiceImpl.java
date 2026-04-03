package com.osiyo.school.service.impl;

import com.osiyo.school.dto.faq.FaqRequest;
import com.osiyo.school.dto.faq.FaqResponse;
import com.osiyo.school.entity.Faq;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.FaqMapper;
import com.osiyo.school.repository.FaqRepository;
import com.osiyo.school.service.FaqService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FaqServiceImpl implements FaqService {

    private final FaqRepository faqRepository;

    @Override
    public List<FaqResponse> getPublicFaqs(String category) {
        List<Faq> items = category == null || category.isBlank()
                ? faqRepository.findByActiveTrueOrderBySortOrderAsc()
                : faqRepository.findByActiveTrueAndCategoryIgnoreCaseOrderBySortOrderAsc(category);
        return items.stream().map(FaqMapper::toResponse).toList();
    }

    @Override
    public List<FaqResponse> getAdminFaqs() {
        return faqRepository.findAll().stream()
                .sorted((first, second) -> Integer.compare(first.getSortOrder(), second.getSortOrder()))
                .map(FaqMapper::toResponse)
                .toList();
    }

    @Override
    public FaqResponse createFaq(FaqRequest request) {
        Faq faq = new Faq();
        apply(faq, request);
        return FaqMapper.toResponse(faqRepository.save(faq));
    }

    @Override
    public FaqResponse updateFaq(Long id, FaqRequest request) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ topilmadi"));
        apply(faq, request);
        return FaqMapper.toResponse(faqRepository.save(faq));
    }

    @Override
    public void deleteFaq(Long id) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ topilmadi"));
        faqRepository.delete(faq);
    }

    private void apply(Faq faq, FaqRequest request) {
        faq.setQuestion(request.question());
        faq.setAnswer(request.answer());
        faq.setCategory(request.category());
        faq.setSortOrder(request.sortOrder() == null ? 0 : request.sortOrder());
        faq.setActive(request.active());
    }
}
