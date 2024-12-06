package com.dev.ecommerce.vnpay.service.impl;

import com.dev.ecommerce.vnpay.config.VNPayConfig;
import com.dev.ecommerce.vnpay.dto.PaymentResponseDTO;
import com.dev.ecommerce.vnpay.service.VNPService;
import com.dev.ecommerce.vnpay.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class VNPServiceImpl implements VNPService {

    private final VNPayConfig vnpayConfig;
    @Override
    public PaymentResponseDTO createVnPayPayment(HttpServletRequest request, Double totalAmount, Long orderId) {
        Long amount = totalAmount.longValue() * 100L;
        vnpayConfig.setVnp_ReturnUrl(vnpayConfig.getVnp_ReturnUrl()+"/"+orderId);
        log.info(vnpayConfig.getVnp_ReturnUrl());
        String bankCode = "NCB";
        Map<String, String> vnpParamsMap = vnpayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnpayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnpayConfig.getVnp_PayUrl() + "?" + queryUrl;

        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
        paymentResponseDTO.setCode("Ok");
        paymentResponseDTO.setMessage("Successfully");
        paymentResponseDTO.setURL(paymentUrl);
        vnpayConfig.setVnp_ReturnUrl("http://localhost:3000/payment-success");

        return paymentResponseDTO;
    }
}
