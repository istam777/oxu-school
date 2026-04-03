package com.osiyo.school.repository;

import com.osiyo.school.entity.Faq;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findByActiveTrueOrderBySortOrderAsc();
    List<Faq> findByActiveTrueAndCategoryIgnoreCaseOrderBySortOrderAsc(String category);
}
