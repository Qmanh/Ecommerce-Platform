package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Long> {

    public Size findByName(String name);
}
