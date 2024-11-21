package com.dev.ecommerce.controller;


import com.dev.ecommerce.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

//    @GetMapping()
//    public ApiResponse Home(){
//        return ApiResponse.builder()
//                .message("Welcome to Spring boot")
//                .build();
//    }
}
