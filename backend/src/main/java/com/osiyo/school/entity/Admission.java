package com.osiyo.school.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admissions")
public class Admission extends BaseEntity {

    @Column(name = "student_first_name", nullable = false, length = 120)
    private String studentFirstName;

    @Column(name = "student_last_name", nullable = false, length = 120)
    private String studentLastName;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "grade_applying_for", nullable = false, length = 80)
    private String gradeApplyingFor;

    @Column(name = "parent_full_name", nullable = false, length = 160)
    private String parentFullName;

    @Column(name = "parent_phone", nullable = false, length = 60)
    private String parentPhone;

    @Column(name = "parent_email", nullable = false, length = 160)
    private String parentEmail;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "previous_school", length = 180)
    private String previousSchool;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt;
}
