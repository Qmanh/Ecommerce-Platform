package com.dev.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Deal extends abstractEntity{

    private Integer discount;

    @OneToOne
    private HomeCategory category;

    public Deal(Long id, Integer discount, HomeCategory category) {
        super(id);
        this.discount = discount;
        this.category = category;
    }

}
