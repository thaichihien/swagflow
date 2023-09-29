package com.swagflow.productservice.brand;

import com.swagflow.productservice.brand.dto.CreateBrandDto;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.dto.CreateCategoryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Brand")
@RestController
@RequestMapping("/api/v1/brand")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @Operation
    @PostMapping
    public Brand createCategory(@RequestBody CreateBrandDto createBrandDto) {
        return brandService.create(createBrandDto);
    }

    @Operation
    @GetMapping
    public List<Brand> getCategories() {
        return brandService.getAll();
    }


}
