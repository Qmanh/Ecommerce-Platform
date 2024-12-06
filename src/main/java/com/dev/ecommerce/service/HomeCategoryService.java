package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Home;
import com.dev.ecommerce.model.HomeCategory;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HomeCategoryService {

    HomeCategory createHomeCategory(HomeCategory homeCategory);
    List<HomeCategory> createCategories(List<HomeCategory> homeCategories);
    HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
    Page<HomeCategory> getAllHomeCategories(Integer pageNumber);
}
