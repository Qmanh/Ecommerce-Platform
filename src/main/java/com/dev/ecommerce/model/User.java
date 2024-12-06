package com.dev.ecommerce.model;

import com.dev.ecommerce.domain.AccountStatus;
import com.dev.ecommerce.domain.USER_ROLE;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import static com.dev.ecommerce.domain.USER_ROLE.ROLE_CUSTOMER;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends abstractEntity {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String email;

    private String fullName;

    private String mobile;

    private USER_ROLE role = ROLE_CUSTOMER;
    private AccountStatus accountStatus = AccountStatus.ACTIVE;

    @OneToMany
    private Set<Address> addresses  = new HashSet<>();

    @ManyToMany
    @JsonIgnore
    private Set<Coupon> usedCoupons  = new HashSet<>();
}
