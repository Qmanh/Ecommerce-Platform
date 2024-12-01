package com.dev.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
public class Transaction extends  abstractEntity {

    @ManyToOne
    private User customer;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Seller seller;

}
