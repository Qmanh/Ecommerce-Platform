package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.domain.OrderStatus;
import com.dev.ecommerce.domain.PaymentStatus;
import com.dev.ecommerce.model.*;
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
import java.util.*;
import java.util.stream.Collectors;

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

        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct()
                        .getSeller().getId()));

        for(Map.Entry<Long, List<CartItem>>entry:itemsBySeller.entrySet()){
            List<CartItem> items = entry.getValue();
            int totalOrderPrice = items.stream().mapToInt(
                    CartItem::getSellingPrice
            ).sum();

            int totalMrpPrice = items.stream().mapToInt(
                    CartItem::getMrpPrice
            ).sum();

            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            double discountPrice = (totalOrderPrice * coupon.getDiscountPercentage()) /100;
            log.info("discountPrice :{}",totalOrderPrice);
            cart.setTotalSellingPrice(totalOrderPrice - discountPrice);
            cart.setTotalMrpPrice(totalMrpPrice);
            cart.setTotalItem(totalItem);
            cart.setCouponCode(couponCode);
        }

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
