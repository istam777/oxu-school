package com.osiyo.school.repository;

import com.osiyo.school.entity.Teacher;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findAllByOrderByCreatedAtAsc();
}
