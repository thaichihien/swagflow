package com.swagflow.productservice.service;

import com.swagflow.productservice.brand.Brand;
import com.swagflow.productservice.brand.BrandService;
import com.swagflow.productservice.brand.BrandServiceImpl;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.CategoryService;
import com.swagflow.productservice.category.CategoryServiceImpl;
import com.swagflow.productservice.image.ImageService;
import com.swagflow.productservice.product.ProductServiceImpl;
import com.swagflow.productservice.product.dto.CreateProductDto;
import com.swagflow.productservice.product.dto.ProductResponse;
import com.swagflow.productservice.product.dto.SizeDto;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductSize;
import com.swagflow.productservice.product.repositories.DataRepository;
import com.swagflow.productservice.product.repositories.ProductImageRepository;
import com.swagflow.productservice.product.repositories.ProductRepository;
import com.swagflow.productservice.product.repositories.ProductSizeRepository;
import com.swagflow.productservice.size.Size;
import com.swagflow.productservice.size.SizeService;
import com.swagflow.productservice.utils.CSVService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    private ProductServiceImpl productService;

    @Mock
    private ProductRepository productRepository;
    @Mock
    private ProductSizeRepository productSize;
    @Mock
    private ProductImageRepository productImage;


    @Mock
    private CategoryServiceImpl categoryService;
    @Mock
    private BrandServiceImpl brandService;
    @Mock
    private SizeService sizeService;
    @Mock
    private ImageService imageService;
    @Mock
    private CSVService csvService;

    private ProductResponse productResponseSample;
    private Product productSample;
    private Category categorySample;
    private Brand brandSample;
    private List<ProductSize> productSizeListSample;


    @BeforeEach
    void init() {
        DataRepository dataRepository = new DataRepository(productRepository, productSize, productImage);
        productService = new ProductServiceImpl(dataRepository, categoryService, brandService, sizeService, imageService,csvService);

        categorySample = Category.builder().name("T Shirt").build();
        brandSample = Brand.builder().name("FakeBrand").build();
        productSample = Product.builder()
                .id(UUID.randomUUID())
                .name("Fake T Shirt")
                .description("This is a fake T Shirt")
                .price(15000d)
                .brand(brandSample)
                .category(categorySample)
                .build();
        productSizeListSample = List.of(
                ProductSize.builder()
                        .size(Size.builder().name("S").build())
                        .product(productSample)
                        .quantity(2)
                        .build(),
                ProductSize.builder()
                        .size(Size.builder().name("M").build())
                        .product(productSample)
                        .quantity(3)
                        .build()
                );

        productSample.setProductSizes(productSizeListSample);
        productResponseSample = ProductResponse
                .builder()
                .id(productSample.getId())
                .name(productSample.getName())
                .description(productSample.getDescription())
                .price(productSample.getPrice())
                .category(categorySample.getName())
                .brand(brandSample.getName())
                .build();


    }

    @Test
    @DisplayName("Should return newly created product")
    void create_case01() {
        CreateProductDto createProductDto = CreateProductDto
                .builder()
                .name(productResponseSample.getName())
                .brandId(UUID.randomUUID().toString())
                .categoryId(UUID.randomUUID().toString())
                .price(productResponseSample.getPrice())
                .description(productResponseSample.getDescription())
                .sizes(List.of(new SizeDto(5L,2),
                        new SizeDto(6L,3)))
                .build();


        when(categoryService.findById(createProductDto.getCategoryId())).thenReturn(categorySample);
        when(brandService.findById(createProductDto.getBrandId())).thenReturn(brandSample);

        when(productRepository.save(any(Product.class))).thenReturn(productSample);
        when(sizeService.findById(anyLong())).thenReturn(productSizeListSample.get(0).getSize());
        when(productSize.save(any(ProductSize.class))).thenReturn(productSizeListSample.get(0));

        ProductResponse result = productService.create(createProductDto);

        assertNotNull(result);
        assertThat(result.getId()).isEqualTo(productResponseSample.getId());
        assertThat(result.getName()).isEqualTo(productResponseSample.getName());
    }





}
