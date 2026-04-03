package com.osiyo.school.mapper;

import com.osiyo.school.dto.admission.AdmissionResponse;
import com.osiyo.school.entity.Admission;

public final class AdmissionMapper {

    private AdmissionMapper() {
    }

    public static AdmissionResponse toResponse(Admission admission) {
        return new AdmissionResponse(
                admission.getId(),
                admission.getStudentFirstName(),
                admission.getStudentLastName(),
                admission.getDateOfBirth(),
                admission.getGradeApplyingFor(),
                admission.getParentFullName(),
                admission.getParentPhone(),
                admission.getParentEmail(),
                admission.getAddress(),
                admission.getPreviousSchool(),
                admission.getNotes(),
                admission.getSubmittedAt(),
                admission.getCreatedAt(),
                admission.getUpdatedAt()
        );
    }
}
