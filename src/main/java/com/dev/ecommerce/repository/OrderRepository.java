package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByUserId(Long userId,Pageable pageable);
    List<Order> findBySellerId(Long sellerId, Pageable pageable);
    List<Order> findBySellerId(Long sellerId);

    @Query("DELETE FROM Order o WHERE o.shippingAddress.id = :addressId")
    void deleteByShippingAddress(Long addressId);

    @Query("SELECT SUM (o.totalSellingPrice) as total FROM Order o Where o.sellerId = :sellerId")
    Long totalSellingPriceBySellerId(Long sellerId);

}
