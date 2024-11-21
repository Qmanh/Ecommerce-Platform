package com.dev.ecommerce.service;

import com.dev.ecommerce.domain.PaymentMethod;
import com.dev.ecommerce.model.Order;
import com.dev.ecommerce.model.PaymentOrder;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.vnpay.dto.PaymentResponseDTO;
import com.stripe.exception.StripeException;

import java.util.Set;

public interface PaymentService {
    public PaymentOrder createOrder(User user, Set<Order> orders, PaymentMethod paymentMethod);
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    public PaymentOrder getPaymentOrderByPaymentId(Long paymentId) throws Exception;
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, Long paymentId, String vnp_CardType, String vnp_PayDate);

    public PaymentResponseDTO createShipCod(User user, Long amount, Long id);
}
