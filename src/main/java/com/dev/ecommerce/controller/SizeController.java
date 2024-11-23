package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.model.Size;
import com.dev.ecommerce.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/product/size")
public class SizeController {

    private final SizeService sizeService;

    @PostMapping()
    public ResponseEntity<Size> createSize(@RequestBody SizeRequest request){
        return null;
    }
}
