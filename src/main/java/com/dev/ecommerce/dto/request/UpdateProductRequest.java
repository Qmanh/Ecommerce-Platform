package com.dev.ecommerce.dto.request;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UpdateProductRequest {
    private String title;
    private String description;
    private int mrpPrice;
    private int sellingPrice;
    private int quantity;
    private String color;
    private List<String> images;
    private String category;
    private String category2;
    private String category3;

    private List<String> sizes = new ArrayList<>();
}
