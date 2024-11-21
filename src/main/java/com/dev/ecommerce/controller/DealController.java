package com.dev.ecommerce.controller;

import com.dev.ecommerce.dto.response.ApiResponse;
import com.dev.ecommerce.model.Deal;
import com.dev.ecommerce.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {

    private final DealService dealService;

    @GetMapping
    public ResponseEntity<List<Deal>> getAllDeals(){
        List<Deal> deals = dealService.getDeals();

        return new ResponseEntity<>(deals, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Deal> createDeals(@RequestBody Deal deal){
        Deal createdDeal = dealService.createDeal(deal);

        return new ResponseEntity<>(createdDeal, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable("id")Long id,
                                           @RequestBody Deal deal) throws Exception {
        Deal updatedDeal = dealService.updateDeal(deal,id);
        return ResponseEntity.ok(updatedDeal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDeal(@PathVariable("id")Long id) throws Exception {
        dealService.deleteDeal(id);

        ApiResponse response = new ApiResponse();
        response.setMessage("Deal deleted");

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
