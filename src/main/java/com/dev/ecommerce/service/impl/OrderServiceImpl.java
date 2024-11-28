package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.domain.OrderStatus;
import com.dev.ecommerce.domain.PaymentStatus;
import com.dev.ecommerce.dto.OrderDTO;
import com.dev.ecommerce.model.*;
import com.dev.ecommerce.repository.AddressRepository;
import com.dev.ecommerce.repository.OrderItemRepository;
import com.dev.ecommerce.repository.OrderRepository;
import com.dev.ecommerce.service.OrderService;
import com.dev.ecommerce.service.SellerService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;


    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        if(!user.getAddresses().contains(shippingAddress)){
            user.getAddresses().add(shippingAddress);
        }
        Address address = addressRepository.save(shippingAddress);

        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct()
                        .getSeller().getId()));
        Set<Order> orders = new HashSet<>();

        for(Map.Entry<Long, List<CartItem>>entry:itemsBySeller.entrySet()){
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();
            int totalOrderPrice = items.stream().mapToInt(
                   CartItem::getSellingPrice
            ).sum();

            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            Order createOrder = new Order();
            createOrder.setUser(user);
            createOrder.setSellerId(sellerId);
            createOrder.setTotalMrpPrice(totalOrderPrice);
            createOrder.setTotalSellingPrice(totalOrderPrice);
            createOrder.setTotalItem(totalItem);
            createOrder.setShippingAddress(address);
            createOrder.setOrderStatus(OrderStatus.PENDING);
            createOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            Order saveOrder = orderRepository.save(createOrder);
            orders.add(saveOrder);

            List<OrderItem> orderItems = new ArrayList<>();

            for(CartItem item: items){
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(saveOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());

                saveOrder.getOrderItems().add(orderItem);
                OrderItem saveOrderItem = orderItemRepository.save(orderItem);
                orderItems.add(saveOrderItem);
            }
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        return orderRepository.findById(orderId)
                .orElseThrow(()-> new Exception("order not found..."));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<OrderDTO> sellersOrder(Long sellerId, Integer pageNumber) {
         Pageable pageable =  PageRequest.of(pageNumber!= null ? pageNumber:0, 5, Sort.unsorted());
         List<Order>orders = orderRepository.findBySellerId(sellerId, pageable);

         List<OrderDTO> orderDTOList = orders.stream()
                .map(order -> {
                    OrderDTO orderDto = new OrderDTO();
                    orderDto.setId(order.getId());
                    orderDto.setUser(order.getUser());
                    orderDto.setSellerId(order.getSellerId());
                    orderDto.setOrderDate(order.getOrderDate());
                    orderDto.setDeliverDate(order.getDeliverDate());
                    orderDto.setDiscount(order.getDiscount());
                    orderDto.setPaymentStatus(order.getPaymentStatus());
                    orderDto.setTotalMrpPrice(order.getTotalMrpPrice());
                    orderDto.setPaymentDetails(order.getPaymentDetails());
                    orderDto.setTotalSellingPrice(order.getTotalSellingPrice());
                    orderDto.setOrderStatus(order.getOrderStatus());
                    orderDto.setOrderItems(order.getOrderItems());
                    orderDto.setTotalItem(order.getTotalItem());
                    orderDto.setShippingAddress(order.getShippingAddress());
                    return orderDto;
                }).collect(Collectors.toList());
        return orderDTOList;
    }

    @Override
    public Integer getTotalPageNumber(Long sellerId) {
        List<Order>orders = orderRepository.findBySellerId(sellerId);
        Integer totalItems = orders.size();
        Integer totalPageNumber = totalItems / 5;
        return totalPageNumber;
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);

        if(user.getId().equals(order.getUser().getId())){
            throw new Exception("You don't have access to this order");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Override
    public OrderItem getOrderItemById(Long orderItemId) throws Exception {
        return orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new Exception("Order item not exist..."));
    }
}
