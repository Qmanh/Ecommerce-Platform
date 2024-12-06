package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.domain.PaymentMethod;
import com.dev.ecommerce.domain.PaymentOrderStatus;
import com.dev.ecommerce.domain.PaymentStatus;
import com.dev.ecommerce.model.Order;
import com.dev.ecommerce.model.PaymentDetails;
import com.dev.ecommerce.model.PaymentOrder;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.OrderRepository;
import com.dev.ecommerce.repository.PaymentOrderRepository;
import com.dev.ecommerce.service.PaymentService;
import com.dev.ecommerce.service.UserService;
import com.dev.ecommerce.vnpay.dto.PaymentResponseDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;


    @Setter
    @Getter
    @Value("${payment.vnPay.returnUrl}")
    private String returnUrl;

    //private String stripeSecretKey = "sk_test_51QEnBfKnY3d4Sd2lq8Nrl2CjZXwUB4fXrLgw5TtUcm1IGesWgET6pChVwpxpqTNjt0hC7aQNJ4rSKrlbCuhA8Wc200S6BDmV9n";

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders, PaymentMethod paymentMethod) {
        Double amount = orders.stream()
                .mapToDouble(Order::getTotalSellingPrice)
                .sum();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);
        paymentOrder.setPaymentMethod(paymentMethod);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {

        return paymentOrderRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Payment not found..."));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(Long paymentId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId)
                .orElseThrow(() -> new Exception("Payment order not found with payment link id "+ paymentId));
        return paymentOrder;
    }

    @Override
    public PaymentResponseDTO createShipCod(User user, Double amount, Long id) {
        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
        paymentResponseDTO.setCode("Ok");
        paymentResponseDTO.setMessage("Successfully");
        paymentResponseDTO.setURL(returnUrl+"/"+id+"?amount="+amount);

        return paymentResponseDTO;
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, Long paymentId,String vnp_CardType,String vnp_PayDate) {
        if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)){
            Set<Order> orders = paymentOrder.getOrders();
            for(Order order : orders){
                if(vnp_CardType.equals("ATM")){
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    order.getPaymentDetails().setPayment_id(""+paymentId);
                    order.getPaymentDetails().setVnp_PayDate(vnp_PayDate);
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                }else{
                    order.setPaymentStatus(PaymentStatus.PROCESSING);
                    order.getPaymentDetails().setPayment_id(""+paymentId);
                }
                orderRepository.save(order);
            }
            paymentOrderRepository.save(paymentOrder);
            return true;
        }else{
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
    }

}
