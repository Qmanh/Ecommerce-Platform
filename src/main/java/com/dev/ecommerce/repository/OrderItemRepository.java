package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.OrderItem;
import com.dev.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM OrderItem o WHERE o.product.id = :productId")
    void deleteOrderItemsByProductId(Long productId);

    OrderItem findOrderItemByProduct(Product product);
}
