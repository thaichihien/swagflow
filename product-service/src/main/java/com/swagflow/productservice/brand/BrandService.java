package com.swagflow.productservice.brand;



import com.swagflow.productservice.brand.dto.CreateBrandDto;
import com.swagflow.productservice.brand.dto.UpdateBrandDto;

import java.util.List;

public interface BrandService {

    Brand create(CreateBrandDto createBrandDto);

    List<Brand> getAll();

    Brand findById(String id);

    Brand findByName(String name);

    Brand update(UpdateBrandDto updateBrandDto);

    void delete(String id);
    
}
