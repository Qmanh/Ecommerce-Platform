package com.dev.ecommerce.controller;


import com.dev.ecommerce.dto.request.CreateReviewRequest;
import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.dto.response.ReviewResponse;
import com.dev.ecommerce.model.Product;
import com.dev.ecommerce.model.Review;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.ProductService;
import com.dev.ecommerce.service.ReviewService;
import com.dev.ecommerce.service.UserService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<ReviewResponse> getReviewsByProductId(@PathVariable("productId")Long productId,
                                                                      @RequestParam (defaultValue = "0") Integer pageNumber){
            List<Review> reviews = reviewService.getReviewByProductId(productId,pageNumber);
            Integer totalPageNumber = reviewService.getAllTotalReviewsByProductId(productId);

            ReviewResponse reviewResponse = new ReviewResponse();
            reviewResponse.setReviews(reviews);
            reviewResponse.setTotalPageNumber(totalPageNumber);
            return ResponseEntity.ok(reviewResponse);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<Review> writeReview(@RequestBody CreateReviewRequest request,
                                              @PathVariable ("productId")Long productId,
                                              @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);

        Review review = reviewService.createReview(request, user, product);

        return ResponseEntity.ok(review);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@RequestBody CreateReviewRequest request,
                                               @PathVariable("reviewId")Long reviewId,
                                               @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Review review = reviewService.updateReview(
                reviewId,
                request.getReviewText(),
                request.getReviewRating(),
                user.getId()
        );

        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable("reviewId")Long reviewId,
                                                    @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse response = new ApiResponse();
        response.setMessage("Review deleted successfully");

        return ResponseEntity.ok(response);
    }

}
