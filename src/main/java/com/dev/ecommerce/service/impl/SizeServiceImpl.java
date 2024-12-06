package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.domain.StatusSize;
import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.model.Size;
import com.dev.ecommerce.repository.SizeRepository;
import com.dev.ecommerce.service.SizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

@Slf4j
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;

    @Override
    public Size createSize(SizeRequest request) {
        Size size = sizeRepository.findByName(request.getName());
        if(size == null){
            Size newSize = new Size();
            newSize.setName(request.getName());
            newSize.setDescription(request.getDescription());
            return sizeRepository.save(newSize);
        }else{
            throw new ProductException("Size already exist...");
        }

    }

    @Override
    public List<Size> getAllSize() {
        return sizeRepository.findAll();
    }

    @Override
    public List<Size> getAllSizeActive() {
        return sizeRepository.getAllSizeActive();
    }

    @Override
    public Size updateSize(SizeRequest request, Long id) {
        Size currentSize = sizeRepository.findById(id)
                .orElseThrow(()-> new ProductException("Not find size with id: "+id));

        currentSize.setName(request.getName());
        currentSize.setName(request.getDescription());
        return sizeRepository.save(currentSize);
    }

    @Override
    public boolean deleteSize(String name) {
        Size size = sizeRepository.findByName(name);

        if(size!=null){
            if(size.getStatusSize().equals(StatusSize.YES)){
                size.setStatusSize(StatusSize.NO);
                log.info("sizess Yes: {}",size.getStatusSize());
            }else{
                size.setStatusSize(StatusSize.YES);
                log.info("sizess No: {}",size.getStatusSize());
            }
            sizeRepository.save(size);
            return true;
        }

        return false;

    }


}
