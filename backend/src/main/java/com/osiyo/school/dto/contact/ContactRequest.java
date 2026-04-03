package com.osiyo.school.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "F.I.Sh. majburiy") @Size(max = 160) String fullName,
        @NotBlank(message = "Telefon majburiy") @Size(max = 60) String phone,
        @NotBlank(message = "Email majburiy") @Email(message = "Email noto‘g‘ri") @Size(max = 160) String email,
        @NotBlank(message = "Mavzu majburiy") @Size(max = 180) String subject,
        @NotBlank(message = "Xabar majburiy") String message
) {
}
