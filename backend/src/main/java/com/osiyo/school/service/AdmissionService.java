package com.osiyo.school.service;

import com.osiyo.school.dto.admission.AdmissionRequest;
import com.osiyo.school.dto.admission.AdmissionResponse;
import com.osiyo.school.dto.common.PagedResponse;

public interface AdmissionService {
    AdmissionResponse createAdmission(AdmissionRequest request);
    PagedResponse<AdmissionResponse> getAdmissions(int page, int size);
    AdmissionResponse getAdmission(Long id);
}
