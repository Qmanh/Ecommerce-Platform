package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.dto.response.InformReportSeller;
import com.dev.ecommerce.exceptions.SellerException;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.model.SellerReport;
import com.dev.ecommerce.repository.SellerReportRepository;
import com.dev.ecommerce.service.SellerReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

    private final SellerReportRepository sellerReportRepository;

    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport sellerReport = sellerReportRepository.findBySellerId(seller.getId());

        if(sellerReport == null){
            SellerReport newReport = new SellerReport();
            newReport.setSeller(seller);
            return sellerReportRepository.save(newReport);
        }
        return sellerReport;
    }

    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {
        return sellerReportRepository.save(sellerReport);
    }

    @Override
    public InformReportSeller getTotalEarningBySellerId(Seller seller) {
        if(seller!=null){
            SellerReport sellerReport =  sellerReportRepository.findBySellerId(seller.getId());
            InformReportSeller informReportSeller = new InformReportSeller();
            informReportSeller.setTotalEarning(sellerReport.getTotalEarnings());
            informReportSeller.setTotalOrders((sellerReport.getTotalOrders()));
            informReportSeller.setTotalCancelOrders(sellerReport.getCanceledOrders());

            return informReportSeller;
        }else{
            throw new SellerException("Not found seller...");
        }

    }
}
