package com.dev.ecommerce.controller;

import com.dev.ecommerce.domain.USER_ROLE;
import com.dev.ecommerce.dto.request.SignUpRequest;
import com.dev.ecommerce.dto.response.AuthResponse;
import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.AddressService;
import com.dev.ecommerce.service.AuthService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final AddressService addressService;

    @GetMapping("/users/profile")
    public ResponseEntity<User> createUserHandler(@RequestHeader("Authorization")String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(user);

    }

    @GetMapping("/users/address")
    public ResponseEntity<List<Address>> getAllAddressByUser (@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(addressService.findAddressByUserId(user.getId()));

    }

    @DeleteMapping("/users/address/{id}")
    public ResponseEntity<User> deleteAddressUser (@PathVariable("id")Long id, @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.deleteAddress(id,jwt);

        return ResponseEntity.ok(user);
    }

}
