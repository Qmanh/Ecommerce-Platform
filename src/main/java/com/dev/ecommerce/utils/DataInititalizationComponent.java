package com.dev.ecommerce.utils;

import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.domain.USER_ROLE;
import com.dev.ecommerce.model.User;
import com.dev.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInititalizationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }

    private void initializeAdminUser(){
        String adminUsername = "tuan00018@gmail.com";

        if(userRepository.findByEmail(adminUsername)==null){
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setFullName("Admin");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);
            adminUser.setAccountStatus(AccountStatus.ACTIVE);

            User admin = userRepository.save(adminUser);
        }
    }
}
