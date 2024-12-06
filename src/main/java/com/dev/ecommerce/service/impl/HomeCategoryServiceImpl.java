package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.model.HomeCategory;
import com.dev.ecommerce.repository.HomeCategoryRepository;
import com.dev.ecommerce.service.HomeCategoryService;
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
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;


    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {

        if(homeCategoryRepository.findAll().isEmpty()){
            return homeCategoryRepository.saveAll(homeCategories);
        }
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        if(homeCategory.getImage() != null){
            existingCategory.setImage(homeCategory.getImage());
        }
        if(homeCategory.getCategoryId()!= null){
            existingCategory.setCategoryId(homeCategory.getCategoryId());
        }
        if(homeCategory.getName() != null){
            existingCategory.setName(homeCategory.getName());
        }
        if(homeCategory.getSection() != null){
            existingCategory.setSection(homeCategory.getSection());
        }

        return homeCategoryRepository.save(existingCategory);

    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }

    @Override
    public Page<HomeCategory> getAllHomeCategories(Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber!= null ? pageNumber:0, 7, Sort.by("createdAt"));
        return homeCategoryRepository.findAll(pageable);
    }
}
