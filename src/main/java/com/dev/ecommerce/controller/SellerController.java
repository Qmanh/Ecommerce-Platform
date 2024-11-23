package com.dev.ecommerce.controller;

import com.dev.ecommerce.config.JwtProvider;
import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.dto.request.LoginRequest;
import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.dto.response.AuthResponse;
import com.dev.ecommerce.exceptions.SellerException;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.model.SellerReport;
import com.dev.ecommerce.model.VerificationCode;
import com.dev.ecommerce.repository.VerificationCodeRepository;
import com.dev.ecommerce.service.AuthService;
import com.dev.ecommerce.service.EmailService;
import com.dev.ecommerce.service.SellerReportService;
import com.dev.ecommerce.service.SellerService;
import com.dev.ecommerce.utils.OtpUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final EmailService emailService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final SellerReportService sellerReportService;
    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest request) throws Exception {
        String otp = request.getOtp();
        String email = request.getEmail();

        request.setEmail("seller_"+email);
        AuthResponse authResponse = authService.signing(request);

        return ResponseEntity.ok(authResponse);
    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<AuthResponse> verifySellerEmail(@PathVariable("otp") String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if(verificationCode == null || !verificationCode.getOtp().equals(otp)){
            throw new Exception("wrong otp...");
        }

        AuthResponse authResponse = sellerService.verifyEmail(verificationCode.getEmail(),otp);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception, MessagingException {
        Seller saveSeller = sellerService.createSeller(seller);

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode  = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(seller.getEmail());

        verificationCodeRepository.save(verificationCode);


        emailService.VerificationOtpEmail(otp,seller.getEmail());

        return new ResponseEntity<>(saveSeller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable("id")Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);

        return new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(
            @RequestHeader("Authorization")String jwt) throws Exception{
        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization")String jwt) throws Exception{
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);

        return new ResponseEntity<>(report,HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Seller>> getAllSeller(@RequestParam(required = false)AccountStatus status){
        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping("{sellerId}/update-status/{accountStatus}")
    public ResponseEntity<Seller>updateSellerAccountStatus(@RequestHeader("Authorization")String jwt,
                                                           @PathVariable("sellerId")Long sellerId,
                                              @PathVariable("accountStatus") AccountStatus accountStatus)throws Exception{
        Seller seller = sellerService.getSellerById(sellerId);
        Seller updatedSeller = sellerService.updateSellerAccountStatus(seller.getId(), accountStatus);
        return ResponseEntity.ok(updatedSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id)throws Exception{
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
