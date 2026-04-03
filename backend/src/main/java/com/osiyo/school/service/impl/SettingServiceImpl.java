package com.osiyo.school.service.impl;

import com.osiyo.school.dto.homepage.SettingRequest;
import com.osiyo.school.dto.homepage.SettingResponse;
import com.osiyo.school.entity.Setting;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.HomepageMapper;
import com.osiyo.school.repository.SettingRepository;
import com.osiyo.school.service.SettingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {

    private final SettingRepository settingRepository;

    @Override
    public List<SettingResponse> getPublicSettings() {
        return settingRepository.findAllByOrderBySettingKeyAsc().stream()
                .map(HomepageMapper::toResponse)
                .toList();
    }

    @Override
    public List<SettingResponse> getAdminSettings() {
        return getPublicSettings();
    }

    @Override
    public SettingResponse updateSetting(Long id, SettingRequest request) {
        Setting setting = settingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sozlama topilmadi"));
        setting.setSettingKey(request.settingKey());
        setting.setSettingValue(request.settingValue());
        return HomepageMapper.toResponse(settingRepository.save(setting));
    }
}
