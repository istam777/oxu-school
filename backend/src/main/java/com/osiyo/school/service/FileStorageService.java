package com.osiyo.school.service;

import com.osiyo.school.dto.common.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    FileUploadResponse store(MultipartFile file);
}
