package com.dev.ecommerce.model;

import com.dev.ecommerce.domain.StatusSize;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Size extends abstractEntity {

    @Column(unique = true)
    private String name;
    private String description;
    private StatusSize statusSize = StatusSize.YES;

}
