package com.swagflow.productservice.category;

import com.swagflow.productservice.category.dto.CreateCategoryDto;
import com.swagflow.productservice.category.dto.UpdateCategoryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    @Override
    public Category create(CreateCategoryDto createCategoryDto) {
        Optional<Category> existed = categoryRepository.findByName(createCategoryDto.getName());
        if(existed.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Category name is already existed");
        }
        Category created = Category
                .builder()
                .name(createCategoryDto.getName())
                .build();
        categoryRepository.save(created);
        return created;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(String id) {
        UUID categoryId = UUID.fromString(id);
        return categoryRepository.findById(categoryId).orElseThrow();
    }

    @Override
    public Category update(UpdateCategoryDto updateCategoryDto) {
        return null;
    }

    @Override
    public void delete(String id) {

    }
}
