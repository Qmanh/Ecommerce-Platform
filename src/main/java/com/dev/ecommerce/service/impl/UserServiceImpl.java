package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.config.JwtProvider;
import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.exceptions.UserException;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.AddressRepository;
import com.dev.ecommerce.repository.UserRepository;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final AddressRepository addressRepository;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw  new UserException("user not found with email - "+ email);
        }
        return user;
    }

    @Override
    public User deleteAddress(Long addressId, String jwt) throws Exception {
        User user = findUserByJwtToken(jwt);
        Address addressRemove = addressRepository.findById(addressId)
                .orElseThrow(() -> new UserException("not found address by id: "+addressId));

        user.getAddresses().removeIf(address -> address.equals(addressRemove));

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUserByStatus(AccountStatus accountStatus) {
        return userRepository.findAllByAccountStatus(accountStatus);
    }

    @Override
    public User updateUserAccountStatus(String email, AccountStatus accountStatus) {
        User user = userRepository.findByEmail(email);
        user.setAccountStatus(accountStatus);
        return userRepository.save(user);
    }
}
