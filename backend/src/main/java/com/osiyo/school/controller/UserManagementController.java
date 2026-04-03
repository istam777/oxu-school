package com.osiyo.school.controller;

import com.osiyo.school.dto.user.AdminUserRequest;
import com.osiyo.school.dto.user.AdminUserResponse;
import com.osiyo.school.dto.user.AdminUserStatusRequest;
import com.osiyo.school.dto.user.AdminUserUpdateRequest;
import com.osiyo.school.service.UserManagementService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping("/api/admin/users")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<List<AdminUserResponse>> getUsers() {
        return ResponseEntity.ok(userManagementService.getUsers());
    }

    @PostMapping("/api/admin/users")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<AdminUserResponse> createUser(@Valid @RequestBody AdminUserRequest request) {
        return ResponseEntity.ok(userManagementService.createUser(request));
    }

    @PutMapping("/api/admin/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<AdminUserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody AdminUserUpdateRequest request) {
        return ResponseEntity.ok(userManagementService.updateUser(id, request));
    }

    @PutMapping("/api/admin/users/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<AdminUserResponse> updateStatus(@PathVariable Long id, @Valid @RequestBody AdminUserStatusRequest request) {
        return ResponseEntity.ok(userManagementService.updateStatus(id, request));
    }

    @DeleteMapping("/api/admin/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userManagementService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
