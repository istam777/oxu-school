package com.osiyo.school.service.impl;

import com.osiyo.school.dto.auth.AuthResponse;
import com.osiyo.school.dto.auth.LoginRequest;
import com.osiyo.school.dto.auth.UserMeResponse;
import com.osiyo.school.mapper.AuthMapper;
import com.osiyo.school.security.AppUserDetails;
import com.osiyo.school.security.JwtService;
import com.osiyo.school.service.AuthService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest request) {
        AppUserDetails userDetails = (AppUserDetails) authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        ).getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream().map(Object::toString).toList());
        String token = jwtService.generateToken(claims, userDetails);
        return new AuthResponse(token, AuthMapper.toMeResponse(userDetails.getUser()));
    }

    @Override
    public UserMeResponse me(AppUserDetails userDetails) {
        return AuthMapper.toMeResponse(userDetails.getUser());
    }
}
