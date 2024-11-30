package com.dev.ecommerce.dto.response;

import com.dev.ecommerce.dto.OrderDTO;
import lombok.Data;

import java.util.List;

@Data
public class OrdersResponse {

    private List<OrderDTO> orderDTOList;
    private Integer totalPageNumber;
}
