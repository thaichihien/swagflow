package com.swagflow.productservice.category;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.dto.CreateCategoryDto;
import com.swagflow.productservice.category.dto.UpdateCategoryDto;

import java.util.List;

public interface CategoryService {

    Category create(CreateCategoryDto createCategoryDto);

    List<Category> getAllCategories();

    Category findById(String id);
    Category findByName(String name);

    Category update(UpdateCategoryDto updateCategoryDto);

    void delete(String id);
    
    
}
