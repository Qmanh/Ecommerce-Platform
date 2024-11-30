package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.request.CreateProductRequest;
import com.dev.ecommerce.dto.request.UpdateProductRequest;
import com.dev.ecommerce.dto.response.ProductResponse;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.exceptions.SellerException;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.repository.OrderItemRepository;
import com.dev.ecommerce.service.ProductService;
import com.dev.ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers/products")
@RequiredArgsConstructor
@Slf4j
public class SellerProductController {

    private final SellerService sellerService;
    private final ProductService productService;

    @GetMapping()
    public ResponseEntity<ProductResponse> getProductBySellerId(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(defaultValue = "0")Integer pageNumber) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt);

        List<Product> products = productService.getProductBySellerId(seller.getId(),pageNumber);
        ProductResponse productResponse = new ProductResponse();
        productResponse.setProducts(products);

        productResponse.setTotalPageNumber(productService.getTotalPageNumber());

        return new ResponseEntity<>(productResponse, HttpStatus.OK);
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
                                                 @RequestBody UpdateProductRequest request) throws ProductException {

            Product updatedProduct = productService.updateProduct(productId,request);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);

    }
}
