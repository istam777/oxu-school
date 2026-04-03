package com.osiyo.school.dto.admission;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AdmissionResponse(
        Long id,
        String studentFirstName,
        String studentLastName,
        LocalDate dateOfBirth,
        String gradeApplyingFor,
        String parentFullName,
        String parentPhone,
        String parentEmail,
        String address,
        String previousSchool,
        String notes,
        LocalDateTime submittedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
