package com.dev.ecommerce.service;

import com.dev.ecommerce.dto.request.CreateProductRequest;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Seller;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    public Product createProduct(CreateProductRequest request, Seller seller);
    public void deleteProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId, Product product) throws ProductException;
    public Product findProductById(Long productId) throws ProductException;
    public List<Product> searchProducts(String query);
    public Page<Product> getAllProducts(String category,
                                        String brand,
                                        String color,
                                        String sizes,
                                        Integer minimumPrice,
                                        Integer maximumPrice,
                                        Integer minDiscount,
                                        String sort,
                                        String stock,
                                        Integer pageNumber);

    public List<Product> getProductBySellerId(Long sellerId);
}
