package com.dev.ecommerce.controller;

import com.dev.ecommerce.domain.PaymentMethod;
import com.dev.ecommerce.dto.response.PaymentLinkResponse;
import com.dev.ecommerce.model.*;
import com.dev.ecommerce.service.*;
import com.dev.ecommerce.vnpay.config.VNPayConfig;
import com.dev.ecommerce.vnpay.dto.PaymentResponseDTO;
import com.dev.ecommerce.vnpay.service.VNPService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
@Slf4j
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final PaymentService paymentService;
    private final VNPService vnpService;

    @PostMapping()
    public ResponseEntity<PaymentLinkResponse> createOrderHandler(@RequestBody Address shippingAddress,
                                                                  @RequestParam PaymentMethod paymentMethod,
                                                                  HttpServletRequest req,
                                                                  @RequestHeader("Authorization")String jwt
    ) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);
        Set<Order> orders = orderService.createOrder(user,shippingAddress, cart);
        PaymentOrder paymentOrder = paymentService.createOrder(user, orders, paymentMethod);

        PaymentLinkResponse res = new PaymentLinkResponse();
        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
        if(!paymentMethod.equals(PaymentMethod.COD)){
            paymentResponseDTO = vnpService.createVnPayPayment(req,paymentOrder.getAmount(), paymentOrder.getId());
            res.setPayment_link_url(paymentResponseDTO.getURL());
        }else{
            paymentResponseDTO = paymentService.createShipCod(user,paymentOrder.getAmount(), paymentOrder.getId());
            res.setPayment_link_url(paymentResponseDTO.getURL());
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistoryHandler(
            @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order>getOrderById(@PathVariable("orderId")Long orderId,
                                                 @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order orders  = orderService.findOrderById(orderId);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/item/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable("orderItemId")Long orderItemId,
                                                      @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        OrderItem orderItem = orderService.getOrderItemById(orderItemId);

        return new ResponseEntity<>(orderItem, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable ("orderId")Long orderId,
                                             @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.cancelOrder(orderId, user);

        Seller seller = sellerService.getSellerById(order.getSellerId());
        SellerReport report = sellerReportService.getSellerReport(seller);

        report.setCanceledOrders(report.getCanceledOrders()+1);
        report.setTotalRefunds(report.getTotalRefunds() + order.getTotalSellingPrice());
        sellerReportService.updateSellerReport(report);

        return ResponseEntity.ok(order);
    }
}
