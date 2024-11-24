package com.dev.ecommerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coupon extends abstractEntity {

    private String code;

    private double discountPercentage;

    private LocalDate validityStartDate;

    private LocalDate validityEndDate;

    private double minimumOrderValue;

    private boolean isActive=false;

    @ManyToMany(mappedBy = "usedCoupons")
    private Set<User> usedByUser = new HashSet<>();

    public void setActive(boolean isActive){
        this.isActive = isActive;
    }
}
