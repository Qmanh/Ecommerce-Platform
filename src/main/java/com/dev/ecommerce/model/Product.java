package com.dev.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends abstractEntity{

    private String title;

    private String description;

    private int mrpPrice;

    private int sellingPrice;

    private int discountPercent;

    private int quantity;

    private String color;

    @ElementCollection
    private List<String> images = new ArrayList<>();

    private int numRatings;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CartItem> cartItems = new ArrayList<>();

    @ManyToOne
    private Seller seller;

    @ManyToMany
    private Set<Size> sizes = new HashSet<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
}
