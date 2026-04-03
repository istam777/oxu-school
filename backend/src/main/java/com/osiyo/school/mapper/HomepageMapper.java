package com.osiyo.school.mapper;

import com.osiyo.school.dto.homepage.HomepageSectionResponse;
import com.osiyo.school.dto.homepage.SettingResponse;
import com.osiyo.school.entity.HomepageSection;
import com.osiyo.school.entity.Setting;

public final class HomepageMapper {

    private HomepageMapper() {
    }

    public static HomepageSectionResponse toResponse(HomepageSection section) {
        return new HomepageSectionResponse(
                section.getId(),
                section.getSectionKey(),
                section.getTitleUz(),
                section.getTitleEn(),
                section.getTitleRu(),
                section.getContentUz(),
                section.getContentEn(),
                section.getContentRu(),
                section.getImageUrl(),
                section.isActive(),
                section.getCreatedAt(),
                section.getUpdatedAt()
        );
    }

    public static SettingResponse toResponse(Setting setting) {
        return new SettingResponse(
                setting.getId(),
                setting.getSettingKey(),
                setting.getSettingValue(),
                setting.getCreatedAt(),
                setting.getUpdatedAt()
        );
    }
}
