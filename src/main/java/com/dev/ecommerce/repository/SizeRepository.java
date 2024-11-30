package com.dev.ecommerce.repository;

import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface SizeRepository extends JpaRepository<Size, Long> {

    public Size findByName(String name);
}
