package com.dev.ecommerce.vnpay.service;

import com.dev.ecommerce.vnpay.dto.PaymentResponseDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface VNPService {

    public PaymentResponseDTO createVnPayPayment(HttpServletRequest request,Double totalAmount, Long orderId);
}
