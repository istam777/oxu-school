package com.osiyo.school.service;

import com.osiyo.school.dto.homepage.SettingRequest;
import com.osiyo.school.dto.homepage.SettingResponse;
import java.util.List;

public interface SettingService {
    List<SettingResponse> getPublicSettings();
    List<SettingResponse> getAdminSettings();
    SettingResponse updateSetting(Long id, SettingRequest request);
}
