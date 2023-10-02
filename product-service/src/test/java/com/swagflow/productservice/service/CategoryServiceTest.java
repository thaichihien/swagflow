package com.swagflow.productservice.service;

import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.CategoryRepository;
import com.swagflow.productservice.category.CategoryService;
import com.swagflow.productservice.category.CategoryServiceImpl;
import com.swagflow.productservice.category.dto.CreateCategoryDto;
import com.swagflow.productservice.category.dto.UpdateCategoryDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;
    @InjectMocks
    private CategoryServiceImpl categoryService;

    private Category categorySample;

    @BeforeEach
    void init(){
        categorySample = Category.builder()
                .name("Fake")
                .build();
    }


    @Test
    @DisplayName("Should create new category if the category's name is new")
    void create_case01(){

        CreateCategoryDto createCategoryDto = new CreateCategoryDto();
        createCategoryDto.setName(categorySample.getName());

        when(categoryRepository.findByName(anyString())).thenReturn(Optional.empty());
        when(categoryRepository.save(any(Category.class))).thenReturn(categorySample);

        Category result = categoryService.create(createCategoryDto);

        assertNotNull(result);
        assertThat(result.getName()).isEqualTo(categorySample.getName());
    }
    @Test
    @DisplayName("Should throw NoSuchElementException if the category's name is already existed")
    void create_case02(){
        CreateCategoryDto createCategoryDto = new CreateCategoryDto();
        createCategoryDto.setName(categorySample.getName());

        when(categoryRepository.findByName(anyString())).thenThrow(NoSuchElementException.class);

        assertThrows(NoSuchElementException.class,() -> categoryService.create(createCategoryDto));
    }

    @Test
    @DisplayName("Should return a list of categories")
    void getAllCategories_case01(){
        Category sendCategory = Category.builder().name("Second").build();
        List<Category> sample = new LinkedList<>();
        sample.add(categorySample);
        sample.add(sendCategory);

        when(categoryRepository.findAll()).thenReturn(sample);

        List<Category> result = categoryService.getAllCategories();

        assertEquals(sample.size(), result.size());
    }


    @Test
    @DisplayName("Should return a category by given id")
    void findById_case01(){
        String id = UUID.randomUUID().toString();
        when(categoryRepository.findById(any(UUID.class))).thenReturn(Optional.of(categorySample));

        Category result = categoryService.findById(id);
        assertNotNull(result);
        assertThat(result.getName()).isEqualTo(categorySample.getName());
    }

    @Test
    @DisplayName("Should throw NoSuchElementException if the category with the given id is not found")
    void findById_case02(){
        String id = UUID.randomUUID().toString();
        when(categoryRepository.findById(any(UUID.class))).thenThrow(NoSuchElementException.class);

        assertThrows(NoSuchElementException.class,() -> categoryService.findById(id));
    }

    @Test
    @DisplayName("Should throw IllegalArgumentException if the given id is invalid")
    void findById_case03(){
        String id = "invalid";
        assertThrows(IllegalArgumentException.class,() -> categoryService.findById(id));
    }

    @Test
    @DisplayName("Should return the updated category with the new name if the category is found with the given id")
    void update_case01(){
        String id = UUID.randomUUID().toString();
        UpdateCategoryDto updateCategoryDto = new UpdateCategoryDto();
        updateCategoryDto.setId(id);
        updateCategoryDto.setName(categorySample.getName());

        when(categoryRepository.findById(any(UUID.class))).thenReturn(Optional.of(categorySample));
        when(categoryRepository.save(any(Category.class))).thenReturn(categorySample);

        Category result = categoryService.update(updateCategoryDto);

        assertNotNull(result);
        assertThat(result.getName()).isEqualTo(categorySample.getName());
    }

    @Test
    @DisplayName("Should delete the category with the given id")
    void delete_case01(){
        String id = UUID.randomUUID().toString();
        doNothing().when(categoryRepository).deleteById(any(UUID.class));

        categoryService.delete(id);

        verify(categoryRepository,times(1)).deleteById(any(UUID.class));
    }




}
