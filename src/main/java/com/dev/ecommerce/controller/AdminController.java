package com.dev.ecommerce.controller;

import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.service.SellerService;
import com.dev.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Slf4j
public class AdminController {
    private final SellerService sellerService;
    private final UserService userService;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity <Seller> updateSellerStatus(@PathVariable("status")AccountStatus status,
                                                      @PathVariable("id")Long id) throws Exception {
        Seller updatedSeller = sellerService.updateSellerAccountStatus(id, status);
        return ResponseEntity.ok(updatedSeller);
    }

    @GetMapping("/customer/get-all")
    public ResponseEntity <List<User>> getAllCustomer (@RequestParam (required = false)AccountStatus status){
        log.info("status: {}", status);
        List<User> page = userService.getAllUserByStatus(status);

        return ResponseEntity.ok(page);
    }
    @PatchMapping("/{email}/update-status/{accountStatus}")
    public ResponseEntity<User>updateUserAccountStatus(@PathVariable("email")String email,
                                                           @PathVariable("accountStatus") AccountStatus accountStatus)throws Exception{
        User userUpdate = userService.updateUserAccountStatus(email,accountStatus);

        return ResponseEntity.ok(userUpdate);
    }
}
