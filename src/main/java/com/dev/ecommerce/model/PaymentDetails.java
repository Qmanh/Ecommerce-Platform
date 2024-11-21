package com.dev.ecommerce.model;

import com.dev.ecommerce.domain.PaymentStatus;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class PaymentDetails {

    private String payment_id;
    private String vnp_Amount;
    private String vnp_BankCode;
    private String vnp_BankTranNo;
    private String vnp_TransactionStatus;
    private String vnp_PayDate;
    private PaymentStatus status ;
}
