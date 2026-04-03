package com.osiyo.school.service.impl;

import com.osiyo.school.dto.common.FileUploadResponse;
import com.osiyo.school.exception.BadRequestException;
import com.osiyo.school.service.FileStorageService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path uploadPath;

    public FileStorageServiceImpl(@Value("${app.upload-dir}") String uploadDir) throws IOException {
        this.uploadPath = Path.of(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.uploadPath);
    }

    @Override
    public FileUploadResponse store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Yuklanadigan fayl tanlanmagan");
        }
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new BadRequestException("Faqat rasm fayllarini yuklash mumkin");
        }

        String originalName = Objects.requireNonNullElse(file.getOriginalFilename(), "image");
        String extension = originalName.contains(".") ? originalName.substring(originalName.lastIndexOf('.')) : ".bin";
        String storedName = UUID.randomUUID() + extension;
        Path target = uploadPath.resolve(storedName);
        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new BadRequestException("Faylni saqlashning imkoni bo‘lmadi");
        }
        return new FileUploadResponse(storedName, "/uploads/" + storedName);
    }
}
