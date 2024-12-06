package com.dev.ecommerce.dto.response;

import lombok.Data;

@Data
public class SellerReportResponse {
    private Long totalMoneyByOrder;
    private Integer totalProductBySeller;
}
