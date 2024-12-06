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
public class SellerReport extends abstractEntity{

    @OneToOne
    private Seller seller;

    private Double totalEarnings = 0.0;

    private Long totalSales = 0L;

    private Double totalRefunds = 0.0;

    private Long totalTax = 0L;

    private Double netEarnings = 0.0;

    private Integer totalOrders = 0;

    private Integer canceledOrders = 0;

    private Integer totalTransactions = 0;
}
