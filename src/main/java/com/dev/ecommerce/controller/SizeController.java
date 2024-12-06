package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.model.Size;
import com.dev.ecommerce.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/product/size")
public class SizeController {

    private final SizeService sizeService;

    @PostMapping()
    public ResponseEntity<Size> createSize(@RequestBody SizeRequest request){
        Size size = sizeService.createSize(request);
        return new ResponseEntity<>(size,HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Size>> getAllSize(){
        List<Size>sizes = sizeService.getAllSize();
        return new ResponseEntity<>(sizes,HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-all-seller")
    public ResponseEntity<List<Size>> getAllSizeActive(){
        List<Size>sizes = sizeService.getAllSizeActive();
        return new ResponseEntity<>(sizes,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<ApiResponse> deleteSize(@PathVariable("name")String name){
        ApiResponse apiResponse = new ApiResponse();
        if(sizeService.deleteSize(name)){
            apiResponse.setMessage("success");
        }else{
            apiResponse.setMessage("error");
        }

        return ResponseEntity.ok(apiResponse);
    }
}
