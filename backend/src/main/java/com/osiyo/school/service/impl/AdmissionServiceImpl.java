package com.osiyo.school.service.impl;

import com.osiyo.school.dto.admission.AdmissionRequest;
import com.osiyo.school.dto.admission.AdmissionResponse;
import com.osiyo.school.dto.common.PagedResponse;
import com.osiyo.school.entity.Admission;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.AdmissionMapper;
import com.osiyo.school.repository.AdmissionRepository;
import com.osiyo.school.service.AdmissionService;
import com.osiyo.school.util.PaginationUtil;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdmissionServiceImpl implements AdmissionService {

    private final AdmissionRepository admissionRepository;

    @Override
    public AdmissionResponse createAdmission(AdmissionRequest request) {
        Admission admission = Admission.builder()
                .studentFirstName(request.studentFirstName())
                .studentLastName(request.studentLastName())
                .dateOfBirth(request.dateOfBirth())
                .gradeApplyingFor(request.gradeApplyingFor())
                .parentFullName(request.parentFullName())
                .parentPhone(request.parentPhone())
                .parentEmail(request.parentEmail())
                .address(request.address())
                .previousSchool(request.previousSchool())
                .notes(request.notes())
                .submittedAt(LocalDateTime.now())
                .build();
        return AdmissionMapper.toResponse(admissionRepository.save(admission));
    }

    @Override
    public PagedResponse<AdmissionResponse> getAdmissions(int page, int size) {
        Page<AdmissionResponse> admissions = admissionRepository.findAllByOrderBySubmittedAtDesc(PageRequest.of(page, size))
                .map(AdmissionMapper::toResponse);
        return PaginationUtil.fromPage(admissions);
    }

    @Override
    public AdmissionResponse getAdmission(Long id) {
        return admissionRepository.findById(id)
                .map(AdmissionMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Ariza topilmadi"));
    }
}
