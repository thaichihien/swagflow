package com.swagflow.productservice.category;

import com.swagflow.productservice.category.dto.CreateCategoryDto;
import com.swagflow.productservice.category.dto.UpdateCategoryDto;
import com.swagflow.productservice.exception.ExceptionHelper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Getter
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    @Override
    public Category create(CreateCategoryDto createCategoryDto) {
        Optional<Category> existed = categoryRepository.findByName(createCategoryDto.getName());
        if(existed.isPresent()){
            throw new NoSuchElementException("Category name is already existed");
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
        UUID categoryId = ExceptionHelper.UUID.fromStringOrElseThrow(id,ExceptionHelper.ServerErrorMessage.INVALID_ID);
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NoSuchElementException(String.format("Category is not found with id : %s",id)));
    }

    @Override
    public Category findByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException(String.format("Category is not found with name : %s",name)));
    }

    @Override
    public Category update(UpdateCategoryDto updateCategoryDto) {
        Category existed = findById(updateCategoryDto.getId());
        existed.setName(updateCategoryDto.getName());
        return categoryRepository.save(existed);
    }


    @Override
    public void delete(String id) {
        UUID categoryId = ExceptionHelper.UUID.fromStringOrElseThrow(id,ExceptionHelper.ServerErrorMessage.INVALID_ID);
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public void clearAll() {
        categoryRepository.deleteAll();
    }
}
