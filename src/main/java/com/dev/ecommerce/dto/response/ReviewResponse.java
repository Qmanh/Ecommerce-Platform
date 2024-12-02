package com.dev.ecommerce.dto.response;

import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Review;
import lombok.Data;

import java.util.List;

@Data
public class ReviewResponse {
    private List<Review> reviews;
    private Integer totalPageNumber;
}
