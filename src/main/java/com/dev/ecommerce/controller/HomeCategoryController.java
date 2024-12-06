package com.dev.ecommerce.controller;


import com.dev.ecommerce.dto.response.DataResponse;
import com.dev.ecommerce.model.Home;
import com.dev.ecommerce.model.HomeCategory;
import com.dev.ecommerce.service.HomeCategoryService;
import com.dev.ecommerce.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Role;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping()
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/admin/home/categories")

    public ResponseEntity<Home> createHomeCategories(@RequestBody List<HomeCategory>homeCategories){
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);

        Home home = homeService.createHomePageData(categories);
        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory(){
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        return ResponseEntity.ok(categories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(@PathVariable("id")Long id,
                                                           @RequestBody HomeCategory homeCategory) throws Exception {
        HomeCategory updatedCategory = homeCategoryService.updateHomeCategory(homeCategory, id);
        return ResponseEntity.ok(updatedCategory);
    }

    @GetMapping("/api/home-category")
    public ResponseEntity<Home> getHomeCategoryForCustomer(@RequestParam(defaultValue = "0") Integer pageNumber){

        Home home = homeService.getAllHomePageData();

        return ResponseEntity.ok(home);
    }
}
