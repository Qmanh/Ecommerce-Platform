package com.dev.ecommerce.service;

import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
    User deleteAddress (Long id, String jwt) throws Exception;
    List<User> getAllUserByStatus(AccountStatus accountStatus);
    User updateUserAccountStatus(String email, AccountStatus accountStatus);
}
