package com.dev.ecommerce.dto.response;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class DataResponse<T> implements Serializable {

    private List<T> dataList;
    private Integer totalPageNumber;
}
