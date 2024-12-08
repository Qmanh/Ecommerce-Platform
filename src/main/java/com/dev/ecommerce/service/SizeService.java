package com.dev.ecommerce.service;

import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.model.Size;

import java.util.List;

public interface SizeService {
    public Size createSize(SizeRequest request);
    public List<Size> getAllSize();
    public List<Size> getAllSizeActive();
    public Size updateSize(SizeRequest request, Long id);
    public boolean deleteSize(String name);

}