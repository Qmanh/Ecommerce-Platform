package com.dev.ecommerce.dto.response;

import com.dev.ecommerce.dto.OrderDTO;
import lombok.Data;

import java.util.List;

@Data
public class OrdersResponse {

    List<OrderDTO> orderDTOList;
    Integer totalPageNumber;
}
