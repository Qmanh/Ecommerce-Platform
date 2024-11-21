package com.dev.ecommerce.vnpay.controller;

import com.dev.ecommerce.vnpay.dto.PaymentResponseDTO;
import com.dev.ecommerce.vnpay.service.VNPService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class VNPayController {

//    private final VNPService vnpService;
//    @GetMapping("/create_vnpay")
//    public ResponseEntity<?> createVNPay(HttpServletRequest req) {
//
//        return ResponseEntity.status(HttpStatus.OK).body(vnpService.createVnPayPayment(req));
//    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return ResponseEntity.status(HttpStatus.OK).body(new PaymentResponseDTO("00","Success",""));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PaymentResponseDTO("","Failed",null));
        }
    }

}
