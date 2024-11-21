package com.dev.ecommerce.service;

import com.dev.ecommerce.domain.USER_ROLE;
import com.dev.ecommerce.dto.request.LoginRequest;
import com.dev.ecommerce.dto.request.SignUpRequest;
import com.dev.ecommerce.dto.response.AuthResponse;

public interface AuthService {

    void sentLoginOtp(String email, USER_ROLE role) throws Exception;
    public String createUser(SignUpRequest request) throws Exception;
    AuthResponse signing(LoginRequest request) throws Exception;
}
