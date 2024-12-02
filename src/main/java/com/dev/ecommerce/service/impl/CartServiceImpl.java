package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.model.*;
import com.dev.ecommerce.repository.CartItemRepository;
import com.dev.ecommerce.repository.CartRepository;
import com.dev.ecommerce.repository.CouponRepository;
import com.dev.ecommerce.repository.UserRepository;
import com.dev.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final UserRepository userRepository;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CouponRepository couponRepository;

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if(isPresent == null){
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity * product.getMrpPrice());

            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);

        }else{
            isPresent.setQuantity(isPresent.getQuantity()+quantity);
            isPresent.setSellingPrice(isPresent.getSellingPrice()+ (product.getSellingPrice()*quantity));
            isPresent.setMrpPrice(isPresent.getMrpPrice()+ (product.getMrpPrice()*quantity));
            cartItemRepository.save(isPresent);
            log.info("update quantiy: {}",isPresent.getQuantity());
        }
        return isPresent;
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0)
        {
            return 0;
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount/mrpPrice)*100;

        return (int) discountPercentage;
    }

    @Override
    public Cart findUserCart(User user) {

        Cart cart = cartRepository.findByUserId(user.getId());

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for(CartItem cartItem : cart.getCartItems()){
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);

        if(cart.getCouponCode()!=null){
            Coupon coupon =couponRepository.findByCode(cart.getCouponCode());
            cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice)+coupon.getDiscountPercentage());
            cart.setTotalSellingPrice(cart.getTotalSellingPrice());
        }else{
            cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
            cart.setTotalSellingPrice(totalPrice - totalPrice*calculateDiscountPercentage(totalPrice, totalDiscountedPrice)/100);
        }

        return cart;
    }
}
