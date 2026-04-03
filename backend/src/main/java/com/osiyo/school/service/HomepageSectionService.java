package com.osiyo.school.service;

import com.osiyo.school.dto.homepage.HomepageSectionRequest;
import com.osiyo.school.dto.homepage.HomepageSectionResponse;
import java.util.List;

public interface HomepageSectionService {
    List<HomepageSectionResponse> getPublicSections();
    List<HomepageSectionResponse> getAdminSections();
    HomepageSectionResponse updateSection(Long id, HomepageSectionRequest request);
}
