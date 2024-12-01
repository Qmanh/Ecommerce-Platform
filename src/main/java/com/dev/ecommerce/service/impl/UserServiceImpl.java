package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.config.JwtProvider;
import com.dev.ecommerce.exceptions.UserException;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.AddressRepository;
import com.dev.ecommerce.repository.UserRepository;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
