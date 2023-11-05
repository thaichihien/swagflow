package com.swagflow.productservice.category;

import com.swagflow.productservice.category.dto.CreateCategoryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Category")
@RestController
@RequestMapping("categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation
    @PostMapping
    public Category createCategory(@RequestBody CreateCategoryDto createCategoryDto){
        return categoryService.create(createCategoryDto);
    }

    @Operation
    @GetMapping
    public List<Category> getCategories(){
        return categoryService.getAllCategories();
    }


}
