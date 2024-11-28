package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.dto.request.DealRequest;
import com.dev.ecommerce.model.Deal;
import com.dev.ecommerce.model.HomeCategory;
import com.dev.ecommerce.repository.DealRepository;
import com.dev.ecommerce.repository.HomeCategoryRepository;
import com.dev.ecommerce.service.DealService;
import com.dev.ecommerce.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {

        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId())
                .orElse(null);
        Deal newDeal = dealRepository.save(deal);
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());

        return dealRepository.save(newDeal);

    }

    @Override
    public Deal updateDeal(DealRequest deal, Long id) throws Exception {
        log.info("Deal: {}",deal);
        Deal existingDeal = dealRepository.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategoryId()).orElse(null);

        if(existingDeal!= null){
            if(deal.getDiscount()!= null){
                existingDeal.setDiscount(deal.getDiscount());
            }
            if(category != null){
                existingDeal.setCategory(category);
            }
            return dealRepository.save(existingDeal);
        }
        throw new Exception("Deal not found");
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new Exception("Deal not found"));

        dealRepository.delete(deal);

    }
}
