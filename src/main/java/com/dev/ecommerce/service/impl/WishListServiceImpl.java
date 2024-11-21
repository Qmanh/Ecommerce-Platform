package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.model.Wishlist;
import com.dev.ecommerce.repository.WishListRepository;
import com.dev.ecommerce.service.WishListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;

    @Override
    public Wishlist createWishList(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);

        return wishListRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishListByUserId(User user) {
        Wishlist wishlist = wishListRepository.findByUserId(user.getId());

        if(wishlist == null){
            wishlist = createWishList(user);
        }
        return wishlist;
    }

    @Override
    public Wishlist addProductToWishList(User user, Product product) {
        Wishlist wishlist = getWishListByUserId(user);
        if(wishlist.getProducts().contains(product)){
            wishlist.getProducts().remove(product);
        }else{
            wishlist.getProducts().add(product);
        }

        return wishListRepository.save(wishlist);
    }
}
