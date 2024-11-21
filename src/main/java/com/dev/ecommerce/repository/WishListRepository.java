package com.dev.ecommerce.repository;


import com.dev.ecommerce.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<Wishlist, Long> {

    Wishlist findByUserId(Long userId);

}
