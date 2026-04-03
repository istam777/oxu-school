package com.osiyo.school.dto.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public record EventRequest(
        @NotBlank(message = "Sarlavha majburiy") @Size(max = 200) String title,
        @Size(max = 220) String slug,
        @NotBlank(message = "Qisqa tavsif majburiy") @Size(max = 500) String summary,
        @NotBlank(message = "Tavsif majburiy") String description,
        String featuredImage,
        @Size(max = 100) String category,
        @NotNull(message = "Tadbir sanasi majburiy") LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        @Size(max = 200) String location,
        boolean published
) {
}
