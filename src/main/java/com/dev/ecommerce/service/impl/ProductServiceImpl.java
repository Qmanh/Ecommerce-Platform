package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.dto.request.CreateProductRequest;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.model.Category;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.repository.CategoryRepository;
import com.dev.ecommerce.repository.ProductRepository;
import com.dev.ecommerce.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest request, Seller seller) {
        Category category1 = categoryRepository.findByCategoryId(request.getCategory());
        if(category1 == null){
            Category category = new Category();
            category.setCategoryId(request.getCategory());
            category.setLevel(1);
            category1 = categoryRepository.save(category);
        }

        Category category2 = categoryRepository.findByCategoryId(request.getCategory2());
        if(category2 == null){
            Category category = new Category();
            category.setCategoryId(request.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }

        Category category3 = categoryRepository.findByCategoryId(request.getCategory3());
        if(category3 == null){
            Category category = new Category();
            category.setCategoryId(request.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        int discountPercentage = calculateDiscountPercentage(request.getMrpPrice(),request.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setDescription(request.getDescription());
        product.setTitle(request.getTitle());
        product.setColor(request.getColor());
        product.setSellingPrice(request.getSellingPrice());
        product.setImages(request.getImages());
        product.setMrpPrice(request.getMrpPrice());
        product.setSizes(request.getSizes());
        product.setDiscountPercent(discountPercentage);

        return productRepository.save(product);
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0)
        {
            throw new ProductException("Actual price must be greater than 0");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount/mrpPrice)*100;

        return (int) discountPercentage;
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        productRepository.delete(product);

    }

    @Override
    public Product updateProduct(Long productId, Product product) throws ProductException {
        findProductById(productId);
        product.setId(productId);

        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        return productRepository.findById(productId)
                .orElseThrow(()-> new ProductException("Product not found with id "+ productId));
    }

    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.searchProduct(query);
    }

    @Override
    public Page<Product> getAllProducts(String category, String brand, String color, String sizes, Integer minimumPrice, Integer maximumPrice, Integer minDiscount, String sort, String stock, Integer pageNumber) {
        Specification<Product> specification = (root, query, criteriaBuilder) -> {
           List<Predicate> predicates = new ArrayList<>();

           if(category!= null){
               Join<Product, Category> categoryJoin = root.join("category");
               predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"),category));
           }

           if(color != null && !color.isEmpty()){
               log.info("color "+ color);
               predicates.add(criteriaBuilder.equal(root.get("color"),color));
           }

            if(sizes != null && !sizes.isEmpty()){
                log.info("size "+ sizes);
                predicates.add(criteriaBuilder.equal(root.get("size"),sizes));
            }

            if(minimumPrice != null ){
                log.info("minimumPrice "+ minimumPrice);
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"),minimumPrice));
            }

            if(maximumPrice != null ){
                log.info("maximumPrice "+ maximumPrice);
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"),maximumPrice));
            }

            if(minDiscount != null ){
                log.info("minDiscount "+ minDiscount);
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"),minDiscount));
            }

            if(stock != null){
                log.info("stock "+ stock);
                predicates.add(criteriaBuilder.equal(root.get("stock"),stock));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        Pageable pageable;
        if(sort != null && sort.isEmpty()){
            pageable = switch (sort) {
                case "price_low" -> PageRequest.of(pageNumber != null
                                ? pageNumber : 0, 10,
                        Sort.by("sellingPrice").ascending());
                case "price_high" -> PageRequest.of(pageNumber != null
                                ? pageNumber : 0, 10,
                        Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber != null
                                ? pageNumber : 0, 10,
                        Sort.unsorted());
            };
        }else{
            pageable = PageRequest.of(pageNumber!= null ? pageNumber:0, 10, Sort.unsorted());
        }
        return productRepository.findAll(specification,pageable);
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) {

        return productRepository.findBySellerId(sellerId);
    }
}
