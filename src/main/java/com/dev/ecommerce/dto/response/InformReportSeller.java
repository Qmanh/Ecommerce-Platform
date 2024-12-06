package com.dev.ecommerce.dto.response;

import lombok.Data;

@Data
public class InformReportSeller {
    private double totalEarning;
    private Integer totalOrders;
    private Integer totalCancelOrders;
}
