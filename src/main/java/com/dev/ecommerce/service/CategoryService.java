package com.dev.ecommerce.service;

import com.dev.ecommerce.dto.request.CategoryRequest;
import com.dev.ecommerce.dto.request.CreateReviewRequest;
import com.dev.ecommerce.model.Category;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Review;
import com.dev.ecommerce.model.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {

    public Category createCategory(CategoryRequest category);
    public Page<Category> getAllCategory(Integer pageNumber, Integer level);
    public List<Category> getAllCategory(Integer level);
    public Integer getAllTotalCategory();
}
