package com.osiyo.school.dto.faq;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record FaqRequest(
        @NotBlank(message = "Savol majburiy") @Size(max = 300) String question,
        @NotBlank(message = "Javob majburiy") String answer,
        @Size(max = 100) String category,
        Integer sortOrder,
        boolean active
) {
}
