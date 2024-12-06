package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {

    List<Product> findBySellerId(Long id, Pageable pageable);

    @Query("SELECT count (p) as total FROM Product p Where p.seller.id = :sellerId")
    Integer totalProductsBySellerId(Long sellerId);

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.images = NULL WHERE p.id = :productId")
    void deleteImagesByProductId(Long productId);

    @Query("select p from Product p where (:query is null or lower(p.title)" +
            "LIKE lower(concat('%', :query, '%') ) ) " +
            "or (:query is null or lower(p.category.name)"+
            "LIKE lower(concat('%', :query, '%') ) )")
    List<Product> searchProduct(@Param("query")String query);
}
