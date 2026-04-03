package com.osiyo.school.repository;

import com.osiyo.school.entity.Setting;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingRepository extends JpaRepository<Setting, Long> {
    Optional<Setting> findBySettingKey(String settingKey);
    List<Setting> findAllByOrderBySettingKeyAsc();
}
