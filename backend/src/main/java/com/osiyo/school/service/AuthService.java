package com.osiyo.school.service;

import com.osiyo.school.dto.auth.AuthResponse;
import com.osiyo.school.dto.auth.LoginRequest;
import com.osiyo.school.dto.auth.UserMeResponse;
import com.osiyo.school.security.AppUserDetails;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    UserMeResponse me(AppUserDetails userDetails);
}
