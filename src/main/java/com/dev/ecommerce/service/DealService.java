package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Deal;
import com.stripe.model.tax.Registration;

import java.util.List;

public interface DealService {
    List<Deal> getDeals();
    Deal createDeal(Deal deal);
    Deal updateDeal(Deal deal, Long id) throws Exception;
    void deleteDeal(Long id) throws Exception;
}