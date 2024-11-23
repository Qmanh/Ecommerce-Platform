package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Address;

import java.util.List;

public interface AddressService {
    public List<Address> findAddressByUserId(Long userId);

}
