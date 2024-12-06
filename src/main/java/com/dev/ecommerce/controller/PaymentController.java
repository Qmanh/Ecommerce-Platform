package com.dev.ecommerce.controller;


import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.dto.response.PaymentLinkResponse;
import com.dev.ecommerce.model.*;
import com.dev.ecommerce.service.*;
import com.stripe.model.PaymentLink;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final TransactionService transactionService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable("paymentId")Long paymentId,
                                                             @RequestParam (required = false) String vnp_CardType,
                                                             @RequestParam (required = false) String vnp_PayDate,
                                                             @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentId);

        boolean paymentSuccess = paymentService.ProceedPaymentOrder(paymentOrder,paymentId,vnp_CardType,vnp_PayDate);

        log.info("paymentSuccess: {}",paymentSuccess);
        if(paymentSuccess && vnp_CardType=="ATM"){
            for(Order order : paymentOrder.getOrders()){
                transactionService.createTransaction(order);
                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);
                report.setTotalOrders(report.getTotalOrders()+1);
                report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales() + order.getOrderItems().size());
                sellerReportService.updateSellerReport(report);
            }
        }
        ApiResponse response = new ApiResponse();
        response.setMessage("Payment successful");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
