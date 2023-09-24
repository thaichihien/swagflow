package com.swagflow.productservice.size;

import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.dto.CreateCategoryDto;
import com.swagflow.productservice.category.dto.UpdateCategoryDto;
import com.swagflow.productservice.size.dto.CreateSizeDto;
import com.swagflow.productservice.size.dto.UpdateSizeDto;

import java.util.List;

public interface SizeService {

    Size create(CreateSizeDto createSizeDto);

    List<Size> getAllSizes();

    Size findById(Long id);

    Size update(UpdateSizeDto updateSizeDto);

    void delete(String id);

}
