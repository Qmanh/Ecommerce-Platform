package com.dev.ecommerce.controller;


import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.Coupon;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.CartService;
import com.dev.ecommerce.service.CouponService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/coupons")
public class AdminCouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;


    @PostMapping("/create")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon){
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable("id")Long id) throws Exception {
        couponService.deleteCoupon(id);

        return ResponseEntity.ok("Coupon deleted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Coupon>> getAllCounpons(){
        List<Coupon> coupons = couponService.findAllCoupons();

        return ResponseEntity.ok(coupons);
    }

    @PatchMapping("/update-active/{id}")
    public ResponseEntity<?> updateActive(@PathVariable("id")Long id) throws Exception {
        couponService.activeStatus(id);

        return ResponseEntity.ok("Coupon updated successfully");
    }
}
