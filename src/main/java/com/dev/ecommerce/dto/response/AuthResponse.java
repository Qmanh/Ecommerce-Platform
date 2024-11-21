package com.dev.ecommerce.dto.response;

import com.dev.ecommerce.domain.USER_ROLE;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
