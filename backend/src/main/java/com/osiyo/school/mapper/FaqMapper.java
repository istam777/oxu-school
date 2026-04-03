package com.osiyo.school.mapper;

import com.osiyo.school.dto.faq.FaqResponse;
import com.osiyo.school.entity.Faq;

public final class FaqMapper {

    private FaqMapper() {
    }

    public static FaqResponse toResponse(Faq faq) {
        return new FaqResponse(
                faq.getId(),
                faq.getQuestion(),
                faq.getAnswer(),
                faq.getCategory(),
                faq.getSortOrder(),
                faq.isActive(),
                faq.getCreatedAt(),
                faq.getUpdatedAt()
        );
    }
}
