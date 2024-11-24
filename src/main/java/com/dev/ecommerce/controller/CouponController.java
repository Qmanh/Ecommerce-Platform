package com.dev.ecommerce.controller;

import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.CartService;
import com.dev.ecommerce.service.CouponService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class CouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupon(@RequestParam String apply,
                                            @RequestParam String code,
                                            @RequestParam double orderValue,
                                            @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart ;

        if(apply.equals("true")){
            cart = couponService.applyCoupon(code, orderValue, user);
        }else{
            cart = couponService.removeCoupon(code, user);
        }

        return ResponseEntity.ok(cart);
    }
}
