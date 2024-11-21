package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.CartItem;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.User;

public interface CartService {

    public CartItem addCartItem(User user, Product product, String size, int quantity);
    public Cart findUserCart(User user);
}
