package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.HomeCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {

}
