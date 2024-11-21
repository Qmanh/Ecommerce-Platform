package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.model.SellerReport;

public interface SellerReportService {

    public SellerReport getSellerReport(Seller seller);
    public SellerReport updateSellerReport(SellerReport sellerReport);
}
