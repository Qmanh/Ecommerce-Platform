package com.dev.ecommerce.dto.response;

import com.dev.ecommerce.model.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private List<Product> products;
    private Integer totalPageNumber;
}
