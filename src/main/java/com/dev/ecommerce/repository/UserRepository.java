package com.dev.ecommerce.repository;

import com.dev.ecommerce.model.Address;
import com.dev.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    @Query("SELECT u.addresses FROM User u WHERE u.id = :userId")
    List<Address> findAddressesByUserId(Long userId);

    @Query("DELETE FROM Address u WHERE u.id = :addressId")
    List<Address> DeleteAddressesByUserId(Long addressId);
}
