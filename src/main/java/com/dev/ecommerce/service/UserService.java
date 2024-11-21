package com.dev.ecommerce.service;

import com.dev.ecommerce.model.User;

public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
}
