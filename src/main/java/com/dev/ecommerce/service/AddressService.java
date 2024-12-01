package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;

import java.util.List;

public interface AddressService {
    public List<Address> findAddressByUserId(Long userId);
    public Address findAddressById(Long id);
    public Address AddressForUser(User user, Address shippingAddress);

}
