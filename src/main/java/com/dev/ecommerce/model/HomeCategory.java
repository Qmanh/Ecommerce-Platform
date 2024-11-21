package com.dev.ecommerce.model;

import com.dev.ecommerce.domain.HomeCategorySection;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HomeCategory extends abstractEntity{

    private String name;
    private String image;
    private String categoryId;
    private HomeCategorySection section;
}
