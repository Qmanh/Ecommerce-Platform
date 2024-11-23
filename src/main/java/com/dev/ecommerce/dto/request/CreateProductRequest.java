package com.dev.ecommerce.dto.request;

import com.dev.ecommerce.model.Size;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class CreateProductRequest {
    private String title;
    private String description;
    private int mrpPrice;
    private int sellingPrice;
    private String color;
    private List<String> images;
    private String category;
    private String category2;
    private String category3;

    private Set<Size> sizes = new HashSet<>();
}
