package com.dev.ecommerce.service;

import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.dto.response.AuthResponse;
import com.dev.ecommerce.exceptions.SellerException;
import com.dev.ecommerce.model.Seller;

import java.util.List;

public interface SellerService {

    Seller getSellerProfile(String jwt) throws Exception;
    Seller createSeller(Seller seller) throws Exception;
    Seller getSellerById(Long id) throws SellerException;
    Seller getSellerByEmail(String email);
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSeller(Long id, Seller seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    AuthResponse verifyEmail(String email, String otp) throws Exception;
    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception;
}
