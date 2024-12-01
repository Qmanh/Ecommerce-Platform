package com.dev.ecommerce.service.impl;


import com.dev.ecommerce.exceptions.UserException;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.AddressRepository;
import com.dev.ecommerce.repository.UserRepository;
import com.dev.ecommerce.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;


    @Override
    public List<Address> findAddressByUserId(Long userId) {
        List<Address> addressList = userRepository.findAddressesByUserId(userId);
        return addressList;
    }

    @Override
    public Address findAddressById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(()-> new UserException(("not found address by id: "+id)));
    }

    @Override
    public Address AddressForUser(User user, Address shippingAddress) {
        if(!user.getAddresses().contains(shippingAddress)){
            user.getAddresses().add(shippingAddress);
        }
        Address address = addressRepository.save(shippingAddress);
        return address;
    }

}
