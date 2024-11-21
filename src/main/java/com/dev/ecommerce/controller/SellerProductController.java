package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.request.CreateProductRequest;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.exceptions.SellerException;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.service.ProductService;
import com.dev.ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers/products")
@RequiredArgsConstructor
public class SellerProductController {

    private final SellerService sellerService;
    private final ProductService productService;

    @GetMapping()
    public ResponseEntity<List<Product>> getProductBySellerId(
            @RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt);

        List<Product> products = productService.getProductBySellerId(seller.getId());

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Product> createProduct(
            @RequestBody CreateProductRequest request,
            @RequestHeader ("Authorization") String jwt
    )throws Exception
    {
        Seller seller = sellerService.getSellerProfile(jwt);
        Product product = productService.createProduct(request,seller);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productId")Long productId){
        try{
            productService.deleteProduct(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(ProductException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable ("productId")Long productId,
                                                 @RequestBody Product product) throws ProductException {

            Product updatedProduct = productService.updateProduct(productId,product);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);

    }
}
