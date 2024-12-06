package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.dto.request.CategoryRequest;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.model.Category;
import com.dev.ecommerce.repository.CategoryRepository;
import com.dev.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryRequest request) {
        Category existed = categoryRepository.findByCategoryId(request.getCategoryId());
        if(existed==null){
            Category newCategory = new Category();
            newCategory.setName(request.getName());
            newCategory.setCategoryId(request.getCategoryId());
            newCategory.setLevel(request.getLevel());
            if(request.getLevel()!= 1){
                newCategory.setParentCategory(categoryRepository.findByCategoryId(request.getParentCategoryId()));
            }
            return categoryRepository.save(newCategory);
        }
        throw new ProductException("Create category failed...");
    }

    @Override
    public Page<Category> getAllCategory(Integer pageNumber, Integer level) {
        Pageable pageable = PageRequest.of(pageNumber!= null ? pageNumber:0, 20, Sort.by("createdAt").descending());
        return  categoryRepository.findByLevel(level,pageable);
    }

    @Override
    public List<Category> getAllCategory(Integer level) {
        return categoryRepository.findAllByLevel(level);
    }

    @Override
    public Integer getAllTotalCategory() {
        return null;
    }
}
