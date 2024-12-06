package com.dev.ecommerce.dto.request;

import lombok.Data;

@Data
public class CategoryRequest {
    private String name;

    private String categoryId;

    private String parentCategoryId;

    private Integer level;
}
