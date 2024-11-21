package com.dev.ecommerce.service;

import com.dev.ecommerce.model.CartItem;

public interface CartItemService {

    public CartItem updateCartItem(Long userId, Long cartItemId, CartItem cartItem) throws Exception;
    public void removeCartItem(Long userId, Long cartItemId) throws Exception;
    public CartItem findCartItemById(Long cartItemId) throws Exception;
}
