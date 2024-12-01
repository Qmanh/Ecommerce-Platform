package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;

public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
    User deleteAddress (Long id, String jwt) throws Exception;
}
