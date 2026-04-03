package com.osiyo.school.service;

import com.osiyo.school.dto.user.AdminUserRequest;
import com.osiyo.school.dto.user.AdminUserResponse;
import com.osiyo.school.dto.user.AdminUserStatusRequest;
import com.osiyo.school.dto.user.AdminUserUpdateRequest;
import java.util.List;

public interface UserManagementService {
    List<AdminUserResponse> getUsers();
    AdminUserResponse createUser(AdminUserRequest request);
    AdminUserResponse updateUser(Long id, AdminUserUpdateRequest request);
    AdminUserResponse updateStatus(Long id, AdminUserStatusRequest request);
    void deleteUser(Long id);
}
