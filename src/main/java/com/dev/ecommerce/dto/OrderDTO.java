package com.dev.ecommerce.dto;

import com.dev.ecommerce.domain.OrderStatus;
import com.dev.ecommerce.domain.PaymentStatus;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.OrderItem;
import com.dev.ecommerce.model.PaymentDetails;
import com.dev.ecommerce.model.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class OrderDTO {

    private Long id;
    private User user;
    private Long sellerId;
    private List<OrderItem> orderItems = new ArrayList<>();
    private Address shippingAddress;
    private PaymentDetails paymentDetails = new PaymentDetails();
    private double totalMrpPrice;
    private double totalSellingPrice;
    private Integer discount;
    private OrderStatus orderStatus;
    private int totalItem;
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    private LocalDateTime orderDate = LocalDateTime.now();
    private LocalDateTime deliverDate = orderDate.plusDays(7);

}
