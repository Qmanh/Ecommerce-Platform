package com.dev.ecommerce.service;

import com.dev.ecommerce.dto.request.CreateReviewRequest;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Review;
import com.dev.ecommerce.model.User;

import java.util.List;

public interface ReviewService {

    public Review createReview(CreateReviewRequest request, User user, Product product);
    public List<Review> getReviewByProductId(Long productId, Integer pageNumber);
    public Integer getAllTotalReviewsByProductId(Long productId);
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;
    public Review getReviewById(Long reviewId) throws Exception;
}
