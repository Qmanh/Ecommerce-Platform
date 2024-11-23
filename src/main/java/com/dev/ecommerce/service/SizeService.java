package com.dev.ecommerce.service;

import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.model.Size;

public interface SizeService {
    public Size createSize(SizeRequest request);
    public Size updateSize(SizeRequest request, Long id);
    public void deleteSize(Long id);
}
