package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.request.AddItemRequest;
import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.CartItem;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.CartRepository;
import com.dev.ecommerce.service.CartItemService;
import com.dev.ecommerce.service.CartService;
import com.dev.ecommerce.service.ProductService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
@Slf4j
public class CartController {

    private final CartItemService cartItemService;
    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;


    @GetMapping()
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);
        log.info("cart - "+cart.getUser().getEmail());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest request,
                                                  @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(request.getProductId());

        CartItem item = cartService.addCartItem(user,
                product,
                request.getSize(),
                request.getQuantity());
        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart successfully!");
        return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(@PathVariable("cartItemId")Long cartItemId,
                                                             @RequestHeader("Authorization")String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item remove from cart");

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(
            @PathVariable ("cartItemId") Long cartItemId,
            @RequestBody CartItem cartItem,
            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        CartItem updatedCartItem = null;
        if(cartItem.getQuantity() > 0){
            updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        }

        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
    }
}
