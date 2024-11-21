package com.dev.ecommerce.controller;

import com.dev.ecommerce.domain.USER_ROLE;
import com.dev.ecommerce.dto.request.LoginOtpRequest;
import com.dev.ecommerce.dto.request.LoginRequest;
import com.dev.ecommerce.dto.request.SignUpRequest;
import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.dto.response.AuthResponse;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.model.VerificationCode;
import com.dev.ecommerce.service.AuthService;
import com.dev.ecommerce.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpRequest request) throws Exception {

        String jwt = authService.createUser(request);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("register success");
        authResponse.setRole(USER_ROLE.ROLE_CUSTOMER);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody LoginOtpRequest request) throws Exception {

        authService.sentLoginOtp(request.getEmail(),request.getRole());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("otp send successfully");
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest request) throws Exception {

        AuthResponse authResponse = authService.signing(request);
        return ResponseEntity.ok(authResponse);
    }
}
