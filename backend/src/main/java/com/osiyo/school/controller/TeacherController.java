package com.osiyo.school.controller;

import com.osiyo.school.dto.common.ApiMessageResponse;
import com.osiyo.school.dto.teacher.TeacherRequest;
import com.osiyo.school.dto.teacher.TeacherResponse;
import com.osiyo.school.service.TeacherService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/api/teachers")
    public ResponseEntity<List<TeacherResponse>> getPublicTeachers() {
        return ResponseEntity.ok(teacherService.getPublicTeachers());
    }

    @GetMapping("/api/admin/teachers")
    public ResponseEntity<List<TeacherResponse>> getAdminTeachers() {
        return ResponseEntity.ok(teacherService.getAdminTeachers());
    }

    @PostMapping("/api/admin/teachers")
    public ResponseEntity<TeacherResponse> createTeacher(@Valid @RequestBody TeacherRequest request) {
        return ResponseEntity.ok(teacherService.createTeacher(request));
    }

    @PutMapping("/api/admin/teachers/{id}")
    public ResponseEntity<TeacherResponse> updateTeacher(@PathVariable Long id, @Valid @RequestBody TeacherRequest request) {
        return ResponseEntity.ok(teacherService.updateTeacher(id, request));
    }

    @DeleteMapping("/api/admin/teachers/{id}")
    public ResponseEntity<ApiMessageResponse> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok(new ApiMessageResponse("O‘qituvchi o‘chirildi"));
    }
}
