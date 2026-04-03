package com.osiyo.school.service;

import com.osiyo.school.dto.teacher.TeacherRequest;
import com.osiyo.school.dto.teacher.TeacherResponse;
import java.util.List;

public interface TeacherService {
    List<TeacherResponse> getPublicTeachers();
    List<TeacherResponse> getAdminTeachers();
    TeacherResponse createTeacher(TeacherRequest request);
    TeacherResponse updateTeacher(Long id, TeacherRequest request);
    void deleteTeacher(Long id);
}
