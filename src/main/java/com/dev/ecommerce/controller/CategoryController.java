package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.request.CategoryRequest;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.Category;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.AddressService;
import com.dev.ecommerce.service.CategoryService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping()
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequest request) throws Exception {

        Category createCategory = categoryService.createCategory(request);

        return new ResponseEntity<>(createCategory, HttpStatus.CREATED);
    }

    @GetMapping("/admin/category")
    public ResponseEntity<Page<Category>> findAllCategory(@RequestParam(defaultValue = "0")Integer pageNumber,
                                                          @RequestParam(defaultValue = "1")Integer level) throws Exception {
        Page<Category> category = categoryService.getAllCategory(pageNumber,level);

        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/customer/category")
    public ResponseEntity<List<Category>> findAllCategoryCustomer(@RequestParam(defaultValue = "1")Integer level) throws Exception {
        List<Category> category = categoryService.getAllCategory(level);

        return new ResponseEntity<>(category, HttpStatus.OK);
    }


//    @GetMapping("/user/{id}")
//    public ResponseEntity<Address> findAddressesByUserId(@PathVariable("id")Long id,@RequestHeader("Authorization")String jwt) throws Exception {
//
//        Address address =  addressService.findAddressById(id);
//
//        return new ResponseEntity<>(address, HttpStatus.OK);
//    }
}
