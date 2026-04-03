package com.osiyo.school.service.impl;

import com.osiyo.school.dto.common.DashboardSummaryResponse;
import com.osiyo.school.repository.AdmissionRepository;
import com.osiyo.school.repository.ContactMessageRepository;
import com.osiyo.school.repository.EventRepository;
import com.osiyo.school.repository.FaqRepository;
import com.osiyo.school.repository.GalleryImageRepository;
import com.osiyo.school.repository.HomepageSectionRepository;
import com.osiyo.school.repository.NewsRepository;
import com.osiyo.school.repository.TeacherRepository;
import com.osiyo.school.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final NewsRepository newsRepository;
    private final EventRepository eventRepository;
    private final GalleryImageRepository galleryImageRepository;
    private final FaqRepository faqRepository;
    private final TeacherRepository teacherRepository;
    private final AdmissionRepository admissionRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final HomepageSectionRepository homepageSectionRepository;

    @Override
    public DashboardSummaryResponse getSummary() {
        return new DashboardSummaryResponse(
                newsRepository.count(),
                eventRepository.count(),
                galleryImageRepository.count(),
                faqRepository.count(),
                teacherRepository.count(),
                admissionRepository.count(),
                contactMessageRepository.count(),
                homepageSectionRepository.count()
        );
    }
}
