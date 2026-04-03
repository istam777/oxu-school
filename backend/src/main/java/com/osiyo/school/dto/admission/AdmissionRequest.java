package com.osiyo.school.dto.admission;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record AdmissionRequest(
        @NotBlank(message = "O‘quvchi ismi majburiy") @Size(max = 120) String studentFirstName,
        @NotBlank(message = "O‘quvchi familiyasi majburiy") @Size(max = 120) String studentLastName,
        @NotNull(message = "Tug‘ilgan sana majburiy") @Past(message = "Tug‘ilgan sana o‘tgan vaqt bo‘lishi kerak") LocalDate dateOfBirth,
        @NotBlank(message = "Sinf majburiy") @Size(max = 80) String gradeApplyingFor,
        @NotBlank(message = "Ota-ona F.I.Sh. majburiy") @Size(max = 160) String parentFullName,
        @NotBlank(message = "Telefon majburiy") @Size(max = 60) String parentPhone,
        @NotBlank(message = "Email majburiy") @Email(message = "Email noto‘g‘ri") @Size(max = 160) String parentEmail,
        @NotBlank(message = "Manzil majburiy") @Size(max = 255) String address,
        @Size(max = 180) String previousSchool,
        String notes
) {
}
