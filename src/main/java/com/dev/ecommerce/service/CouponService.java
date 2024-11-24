package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.Coupon;
import com.dev.ecommerce.model.User;

import java.util.List;

public interface CouponService {
    Cart applyCoupon(String couponCode, double orderValue, User user) throws Exception;
    Cart removeCoupon(String couponCode, User user) throws Exception;
    Coupon findCouponById(Long id) throws Exception;
    Coupon createCoupon(Coupon coupon);
    List<Coupon> findAllCoupons();
    void deleteCoupon(Long id) throws Exception;
    Coupon activeStatus(Long id) throws Exception;
}
