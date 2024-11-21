package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Cart;
import com.dev.ecommerce.model.CartItem;
import com.dev.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
