package com.dev.ecommerce.repository;

import com.dev.ecommerce.dto.response.InformReportSeller;
import com.dev.ecommerce.model.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
    SellerReport findBySellerId(Long sellerId);

}
