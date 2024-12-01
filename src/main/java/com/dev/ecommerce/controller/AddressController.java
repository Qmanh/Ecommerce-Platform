package com.dev.ecommerce.controller;

import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.AddressService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/address")
@Slf4j
public class AddressController {

    private final AddressService addressService;
    private final UserService userService;

    @PostMapping()
    public ResponseEntity<Address> createAddressForUser(@RequestBody Address shippingAddress,
                                                        @RequestHeader("Authorization")String jwt) throws Exception {

        log.info("findby: {}",jwt);
        User user = userService.findUserByJwtToken(jwt);
        Address address = addressService.AddressForUser(user,shippingAddress);

        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Address>> findAddressesByUserId(@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Address> addressList =  addressService.findAddressByUserId(user.getId());

        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Address> findAddressesByUserId(@PathVariable("id")Long id,@RequestHeader("Authorization")String jwt) throws Exception {

        Address address =  addressService.findAddressById(id);

        return new ResponseEntity<>(address, HttpStatus.OK);
    }
}
