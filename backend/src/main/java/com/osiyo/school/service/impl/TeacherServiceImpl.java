package com.osiyo.school.service.impl;

import com.osiyo.school.dto.teacher.TeacherRequest;
import com.osiyo.school.dto.teacher.TeacherResponse;
import com.osiyo.school.entity.Teacher;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.TeacherMapper;
import com.osiyo.school.repository.TeacherRepository;
import com.osiyo.school.service.TeacherService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    @Override
    public List<TeacherResponse> getPublicTeachers() {
        return teacherRepository.findAllByOrderByCreatedAtAsc().stream()
                .map(TeacherMapper::toResponse)
                .toList();
    }

    @Override
    public List<TeacherResponse> getAdminTeachers() {
        return getPublicTeachers();
    }

    @Override
    public TeacherResponse createTeacher(TeacherRequest request) {
        Teacher teacher = new Teacher();
        apply(teacher, request);
        return TeacherMapper.toResponse(teacherRepository.save(teacher));
    }

    @Override
    public TeacherResponse updateTeacher(Long id, TeacherRequest request) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("O‘qituvchi topilmadi"));
        apply(teacher, request);
        return TeacherMapper.toResponse(teacherRepository.save(teacher));
    }

    @Override
    public void deleteTeacher(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("O‘qituvchi topilmadi"));
        teacherRepository.delete(teacher);
    }

    private void apply(Teacher teacher, TeacherRequest request) {
        teacher.setFullName(request.fullName());
        teacher.setRole(request.role());
        teacher.setBio(request.bio());
        teacher.setPhotoUrl(request.photoUrl());
        teacher.setEmail(request.email());
        teacher.setPhone(request.phone());
    }
}
