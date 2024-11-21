package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Home;
import com.dev.ecommerce.model.HomeCategory;

import java.util.List;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);
}
