package com.dev.ecommerce.service.impl;

import com.dev.ecommerce.dto.request.SizeRequest;
import com.dev.ecommerce.exceptions.ProductException;
import com.dev.ecommerce.model.Size;
import com.dev.ecommerce.repository.SizeRepository;
import com.dev.ecommerce.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;

    @Override
    public Size createSize(SizeRequest request) {
        Size size = sizeRepository.findByName(request.getName());
        if(size == null){
            Size newSize = new Size();
            newSize.setName(request.getName());
            newSize.setDescription(request.getDescription());

            sizeRepository.save(newSize);
        }
        throw new ProductException("Size already exist...");
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
    public void deleteSize(Long id) {
        if(sizeRepository.existsById(id)){
            sizeRepository.deleteById(id);
        }else{
            throw new ProductException("Not find size with id: "+id);
        }

    }
}
