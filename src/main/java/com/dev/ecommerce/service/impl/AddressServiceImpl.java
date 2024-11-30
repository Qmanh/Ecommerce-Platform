package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.exceptions.UserException;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.repository.AddressRepository;
import com.dev.ecommerce.repository.OrderRepository;
import com.dev.ecommerce.repository.UserRepository;
import com.dev.ecommerce.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final UserRepository userRepository;


    @Override
    public List<Address> findAddressByUserId(Long userId) {
        List<Address> addressList = userRepository.findAddressesByUserId(userId);
        return addressList;
    }

}
