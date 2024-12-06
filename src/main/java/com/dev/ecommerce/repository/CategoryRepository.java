package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryId(String categoryId);
    Page<Category> findByLevel(Integer level, Pageable pageable);
    List<Category> findAllByLevel(Integer level);
}
