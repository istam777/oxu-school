package com.osiyo.school.service.impl;

import com.osiyo.school.dto.homepage.HomepageSectionRequest;
import com.osiyo.school.dto.homepage.HomepageSectionResponse;
import com.osiyo.school.entity.HomepageSection;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.HomepageMapper;
import com.osiyo.school.repository.HomepageSectionRepository;
import com.osiyo.school.service.HomepageSectionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HomepageSectionServiceImpl implements HomepageSectionService {

    private final HomepageSectionRepository homepageSectionRepository;

    @Override
    public List<HomepageSectionResponse> getPublicSections() {
        return homepageSectionRepository.findByActiveTrueOrderBySectionKeyAsc().stream()
                .map(HomepageMapper::toResponse)
                .toList();
    }

    @Override
    public List<HomepageSectionResponse> getAdminSections() {
        return homepageSectionRepository.findAllByOrderBySectionKeyAsc().stream()
                .map(HomepageMapper::toResponse)
                .toList();
    }

    @Override
    public HomepageSectionResponse updateSection(Long id, HomepageSectionRequest request) {
        HomepageSection section = homepageSectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bo‘lim topilmadi"));
        section.setSectionKey(request.sectionKey());
        section.setTitleUz(request.titleUz());
        section.setTitleEn(request.titleEn());
        section.setTitleRu(request.titleRu());
        section.setContentUz(request.contentUz());
        section.setContentEn(request.contentEn());
        section.setContentRu(request.contentRu());
        section.setImageUrl(request.imageUrl());
        section.setActive(request.active());
        return HomepageMapper.toResponse(homepageSectionRepository.save(section));
    }
}
