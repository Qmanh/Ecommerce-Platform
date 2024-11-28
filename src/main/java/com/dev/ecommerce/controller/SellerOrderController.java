package com.dev.ecommerce.controller;


import com.dev.ecommerce.domain.OrderStatus;
import com.dev.ecommerce.dto.OrderDTO;
import com.dev.ecommerce.dto.response.OrdersResponse;
import com.dev.ecommerce.model.Order;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.service.OrderService;
import com.dev.ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
@Slf4j
public class SellerOrderController {

    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping()
    public ResponseEntity<OrdersResponse> getAllOrdersHandler(@RequestHeader("Authorization")String jwt,
                                                              @RequestParam (defaultValue = "0") Integer pageNumber) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<OrderDTO> orders = orderService.sellersOrder(seller.getId(), pageNumber);
        OrdersResponse ordersResponse = new OrdersResponse();
        ordersResponse.setOrderDTOList(orders);
        ordersResponse.setTotalPageNumber(orderService.getTotalPageNumber(seller.getId()));
        log.info("pageNumber: {}",pageNumber);
        return new ResponseEntity<>(ordersResponse, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderHandler(@RequestHeader("Authorization")String jwt,
                                                    @PathVariable("orderId")Long orderId,
                                                    @PathVariable("orderStatus")OrderStatus orderStatus) throws Exception {
        Order order = orderService.updateOrderStatus(orderId, orderStatus);

        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
    }
}
