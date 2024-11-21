package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.model.Wishlist;

public interface WishListService {

    public Wishlist createWishList(User user);
    public Wishlist getWishListByUserId(User user);
    public Wishlist addProductToWishList(User user, Product product);
}
