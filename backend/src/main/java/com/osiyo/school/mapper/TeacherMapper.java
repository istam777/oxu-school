package com.osiyo.school.mapper;

import com.osiyo.school.dto.teacher.TeacherResponse;
import com.osiyo.school.entity.Teacher;

public final class TeacherMapper {

    private TeacherMapper() {
    }

    public static TeacherResponse toResponse(Teacher teacher) {
        return new TeacherResponse(
                teacher.getId(),
                teacher.getFullName(),
                teacher.getRole(),
                teacher.getBio(),
                teacher.getPhotoUrl(),
                teacher.getEmail(),
                teacher.getPhone(),
                teacher.getCreatedAt(),
                teacher.getUpdatedAt()
        );
    }
}
