package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findBySellerId(Long sellerId);

    @Query("DELETE FROM Order o WHERE o.shippingAddress.id = :addressId")
    void deleteByShippingAddress(Long addressId);
}
