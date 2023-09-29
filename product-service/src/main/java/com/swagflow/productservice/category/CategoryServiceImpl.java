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
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,String.format("Category is not found with id : %s",id)));
    }

    @Override
    public Category findByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,String.format("Category is not found with name : %s",name)));
    }

    @Override
    public Category update(UpdateCategoryDto updateCategoryDto) {
        return null;
    }

    @Override
    public void delete(String id) {

    }
}
