package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.Coupon;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.CartRepository;
import com.dev.ecommerce.repository.CouponRepository;
import com.dev.ecommerce.repository.UserRepository;
import com.dev.ecommerce.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    @Override
    public Cart applyCoupon(String couponCode, double orderValue, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(couponCode);

        Cart cart = cartRepository.findByUserId(user.getId());
        if(coupon == null){
            throw new Exception("Coupon not valid...");
        }
        if(user.getUsedCoupons().contains(coupon)){
            throw new Exception("Coupon already used");
        }

        if(orderValue < coupon.getMinimumOrderValue()){
            throw new Exception("Valid for minimum order value "+ coupon.getMinimumOrderValue());
        }
        if(coupon.isActive() &&
                LocalDate.now().isAfter(coupon.getValidityStartDate())
                && LocalDate.now().isBefore(coupon.getValidityEndDate())
        ){
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) /100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountPrice);
            cart.setCouponCode(couponCode);
            cartRepository.save(cart);
            return cart;
        }

        throw new Exception("Coupon not valid");
    }

    @Override
    public Cart removeCoupon(String couponCode, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(couponCode);

        if(coupon == null){
            throw new Exception("Coupon not found...");
        }

        Cart cart = cartRepository.findByUserId(user.getId());
        double discountPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) /100;
        cart.setTotalSellingPrice(cart.getTotalSellingPrice() + discountPrice);
        cart.setCouponCode(null);

        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id)
                .orElseThrow(() -> new Exception("Coupon not found..."));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {

        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }

    @Override
    public Coupon activeStatus(Long id) throws Exception {
        Coupon coupon = findCouponById(id);

        coupon.setActive(!coupon.isActive());

        return couponRepository.save(coupon);
    }
}
