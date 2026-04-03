package com.osiyo.school.repository;

import com.osiyo.school.entity.HomepageSection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomepageSectionRepository extends JpaRepository<HomepageSection, Long> {
    List<HomepageSection> findByActiveTrueOrderBySectionKeyAsc();
    List<HomepageSection> findAllByOrderBySectionKeyAsc();
    Optional<HomepageSection> findBySectionKey(String sectionKey);
}
