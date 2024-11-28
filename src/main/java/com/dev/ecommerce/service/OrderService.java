package com.dev.ecommerce.service;

import com.dev.ecommerce.domain.OrderStatus;
import com.dev.ecommerce.dto.OrderDTO;
import com.dev.ecommerce.model.*;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface OrderService {
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart);
    public Order findOrderById(Long orderId) throws Exception;
    public List<Order> usersOrderHistory(Long userId);
    public List<OrderDTO> sellersOrder(Long sellerId, Integer pageNumber);
    public Integer getTotalPageNumber(Long sellerId);
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;
    public Order cancelOrder(Long orderId, User user) throws Exception;
    public OrderItem getOrderItemById(Long orderItemId) throws Exception;
}
