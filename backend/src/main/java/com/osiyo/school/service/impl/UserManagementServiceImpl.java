package com.osiyo.school.service.impl;

import com.osiyo.school.dto.user.AdminUserRequest;
import com.osiyo.school.dto.user.AdminUserResponse;
import com.osiyo.school.dto.user.AdminUserStatusRequest;
import com.osiyo.school.dto.user.AdminUserUpdateRequest;
import com.osiyo.school.entity.Role;
import com.osiyo.school.entity.User;
import com.osiyo.school.exception.BadRequestException;
import com.osiyo.school.exception.ResourceNotFoundException;
import com.osiyo.school.mapper.UserMapper;
import com.osiyo.school.repository.RoleRepository;
import com.osiyo.school.repository.UserRepository;
import com.osiyo.school.service.UserManagementService;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserManagementServiceImpl implements UserManagementService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<AdminUserResponse> getUsers() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Override
    public AdminUserResponse createUser(AdminUserRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new BadRequestException("Bu username allaqachon band");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Bu email allaqachon band");
        }

        Role role = roleRepository.findByName(request.role())
                .orElseThrow(() -> new ResourceNotFoundException("Rol topilmadi"));

        User user = User.builder()
                .fullName(request.fullName().trim())
                .username(request.username().trim())
                .email(request.email().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.password()))
                .enabled(true)
                .roles(Set.of(role))
                .build();

        return UserMapper.toResponse(userRepository.save(user));
    }

    @Override
    public AdminUserResponse updateUser(Long id, AdminUserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));
        ensureManageable(user);

        String normalizedUsername = request.username().trim();
        String normalizedEmail = request.email().trim().toLowerCase();

        userRepository.findByUsername(normalizedUsername)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new BadRequestException("Bu username allaqachon band");
                });

        userRepository.findByEmail(normalizedEmail)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new BadRequestException("Bu email allaqachon band");
                });

        Role role = roleRepository.findByName(request.role())
                .orElseThrow(() -> new ResourceNotFoundException("Rol topilmadi"));

        user.setFullName(request.fullName().trim());
        user.setUsername(normalizedUsername);
        user.setEmail(normalizedEmail);
        user.setRoles(Set.of(role));
        if (request.password() != null && !request.password().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.password()));
        }

        return UserMapper.toResponse(userRepository.save(user));
    }

    @Override
    public AdminUserResponse updateStatus(Long id, AdminUserStatusRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));
        ensureManageable(user);
        user.setEnabled(request.enabled());
        return UserMapper.toResponse(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));
        ensureManageable(user);
        userRepository.delete(user);
    }

    private void ensureManageable(User user) {
        boolean hasSuperAdminRole = user.getRoles().stream()
                .anyMatch(role -> "ROLE_SUPER_ADMIN".equals(role.getName()));
        if (hasSuperAdminRole) {
            throw new BadRequestException("Super admin foydalanuvchisini bu bo'limdan o'zgartirib bo'lmaydi");
        }
    }
}
