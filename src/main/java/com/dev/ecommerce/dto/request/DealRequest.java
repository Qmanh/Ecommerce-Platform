package com.dev.ecommerce.dto.request;

import lombok.Data;

@Data
public class DealRequest {
    private Long categoryId;
    private Integer discount;
}
