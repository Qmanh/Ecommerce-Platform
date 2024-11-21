package com.dev.ecommerce.exceptions;

import com.dev.ecommerce.model.Seller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler({SellerException.class})
    public ResponseEntity<ErrorDetails> sellerExceptionHandler(SellerException sellerException, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(sellerException.getMessage());
        errorDetails.setDetails(request.getDescription(false));
        errorDetails.setTimeStamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({UserException.class})
    public ResponseEntity<ErrorDetails> userExceptionHandler(UserException userException, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(userException.getMessage());
        errorDetails.setDetails(request.getDescription(false));
        errorDetails.setTimeStamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({VerificationException.class})
    public ResponseEntity<ErrorDetails> verificationExceptionHandler(VerificationException verificationException, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(verificationException.getMessage());
        errorDetails.setDetails(request.getDescription(false));
        errorDetails.setTimeStamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ProductException.class})
    public ResponseEntity<ErrorDetails> productExceptionHandler(ProductException productException, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(productException.getMessage());
        errorDetails.setDetails(request.getDescription(false));
        errorDetails.setTimeStamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}
