package com.dev.ecommerce.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignUpRequest {

    private String email;

    private String fullName;

    private String otp;
    private String mobile;
}
