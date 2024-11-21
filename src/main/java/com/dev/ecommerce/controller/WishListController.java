package com.dev.ecommerce.controller;

import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.model.Wishlist;
import com.dev.ecommerce.service.ProductService;
import com.dev.ecommerce.service.UserService;
import com.dev.ecommerce.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController {

    private final WishListService wishListService;
    private final UserService userService;
    private final ProductService productService;


    @GetMapping()
    public ResponseEntity<Wishlist> getWishListByUserId(@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Wishlist wishlist = wishListService.getWishListByUserId(user);

        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<Wishlist> addProductToWishList(@RequestHeader("Authorization")String jwt,
                                                         @PathVariable("productId")Long productId) throws Exception {
        Product product = productService.findProductById(productId);
        User user =  userService.findUserByJwtToken(jwt);
        Wishlist updatedWishList = wishListService.addProductToWishList(user, product);

        return ResponseEntity.ok(updatedWishList);
    }
}
