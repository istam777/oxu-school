package com.osiyo.school.repository;

import com.osiyo.school.entity.Admission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {
    Page<Admission> findAllByOrderBySubmittedAtDesc(Pageable pageable);
}
