package com.swagflow.productservice.service;

import com.swagflow.productservice.brand.Brand;
import com.swagflow.productservice.brand.BrandService;
import com.swagflow.productservice.brand.BrandServiceImpl;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.CategoryService;
import com.swagflow.productservice.category.CategoryServiceImpl;
import com.swagflow.productservice.exception.ExceptionHelper;
import com.swagflow.productservice.image.ImageService;
import com.swagflow.productservice.product.ProductServiceImpl;
import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductImage;
import com.swagflow.productservice.product.model.ProductSize;
import com.swagflow.productservice.product.repositories.*;
import com.swagflow.productservice.size.Size;
import com.swagflow.productservice.size.SizeService;
import com.swagflow.productservice.utils.CSVService;
import lombok.NonNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;


import java.util.*;
import java.util.function.Function;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.data.jpa.domain.Specification.where;

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
    private Product productSecondSample;
    private List<Product> productListSample;
    private Category categorySample;
    private Brand brandSample;
    private List<ProductSize> productSizeListSample;
    private  Page<Product> pageProductsSample;


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
        productSecondSample= Product.builder()
                .id(UUID.randomUUID())
                .name("Fake Jacket")
                .description("This is a fake Jacket")
                .price(20000d)
                .brand(brandSample)
                .category( Category.builder().name("Jacket").build())
                .build();
        productSizeListSample = List.of(
                ProductSize.builder()
                        .size(Size.builder().id(new Random().nextLong()).name("S").build())
                        .product(productSample)
                        .quantity(2)
                        .build(),
                ProductSize.builder()
                        .size(Size.builder().id(new Random().nextLong()).name("M").build())
                        .product(productSample)
                        .quantity(3)
                        .build()
                );

        List<ProductSize> productSizeListSecondSample = List.of(
                ProductSize.builder()
                        .size(Size.builder().id(new Random().nextLong()).name("XL").build())
                        .product(productSample)
                        .quantity(1)
                        .build(),
                ProductSize.builder()
                        .size(Size.builder().id(new Random().nextLong()).name("L").build())
                        .product(productSample)
                        .quantity(2)
                        .build()
        );


        productSample.setProductSizes(productSizeListSample);
        productSecondSample.setProductSizes(productSizeListSecondSample);
        productSample.setImages(List.of(ProductImage.builder().url("img01.png").product(productSample).build(),
                ProductImage.builder().url("img02.png").product(productSample).build()));
        productSecondSample.setImages(List.of(ProductImage.builder().url("img03.png").product(productSecondSample).build(),
                ProductImage.builder().url("img04.png").product(productSample).build()));


        productResponseSample = ProductResponse
                .builder()
                .id(productSample.getId())
                .name(productSample.getName())
                .description(productSample.getDescription())
                .price(productSample.getPrice())
                .category(categorySample.getName())
                .brand(brandSample.getName())
                .build();

        productListSample = new LinkedList<>();
        productListSample.add(productSample);
        productListSample.add(productSecondSample);

        pageProductsSample = new Page<Product>() {
            @Override
            public int getTotalPages() {
                return productListSample.size();
            }

            @Override
            public long getTotalElements() {
                return productListSample.size();
            }

            @Override
            public <U> Page<U> map(Function<? super Product, ? extends U> converter) {
                return null;
            }

            @Override
            public int getNumber() {
                return 0;
            }

            @Override
            public int getSize() {
                return 0;
            }

            @Override
            public int getNumberOfElements() {
                return 0;
            }

            @Override
            @NonNull
            public List<Product> getContent() {
                return productListSample;
            }

            @Override
            public boolean hasContent() {
                return true;
            }

            @Override

            public Sort getSort() {
                return null;
            }

            @Override
            public boolean isFirst() {
                return false;
            }

            @Override
            public boolean isLast() {
                return false;
            }

            @Override
            public boolean hasNext() {
                return false;
            }

            @Override
            public boolean hasPrevious() {
                return false;
            }

            @Override
            public Pageable nextPageable() {
                return null;
            }

            @Override
            public Pageable previousPageable() {
                return null;
            }

            @Override
            public Iterator<Product> iterator() {
                return null;
            }
        };

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

    @Test
    @DisplayName("Should return list of ProductFullResponse if the database have at least one product")
    void getAllFullProducts_case01(){
        when(productRepository.findAll()).thenReturn(productListSample);

        List<ProductFullResponse> result = productService.getAllFullProducts();

        assertNotNull(result);
        assertThat(result.size()).isEqualTo(productListSample.size());
    }

    @Test
    @DisplayName("Should return empty list if the database does not have any product")
    void getAllFullProducts_case02(){
        when(productRepository.findAll()).thenReturn(List.of());

        List<ProductFullResponse> result = productService.getAllFullProducts();

        assertNotNull(result);
        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    @DisplayName("Should return the correct ProductResponse and the provided product id")
    void findById_case01(){
        when(productRepository.findById(productSample.getId())).thenReturn(Optional.of(productSample));

        ProductResponse result = productService.findById(productSample.getId().toString());

        assertNotNull(result);
        assertThat(result.getId()).isEqualTo(productSample.getId());
        assertThat(result.getName()).isEqualTo(productSample.getName());
        assertThat(result.getCategory()).isEqualTo(productSample.getCategory().getName());
    }

    @Test
    @DisplayName("Should throw an IllegalArgumentException when the product id is invalid ")
    void findById_case02(){
        //when(productRepository.findById(productSample.getId())).thenReturn(Optional.of(productSample));
        String invalidId = "invalid-id";
        assertThrows(IllegalArgumentException.class,() -> productService.findById(invalidId));
    }

    @Test
    @DisplayName("Should throw an NoSuchElementException when the product is not found  ")
    void findById_case03(){
        String notFoundProductId = UUID.randomUUID().toString();
        when(productRepository.findById(any(UUID.class))).thenThrow(NoSuchElementException.class);

        assertThrows(NoSuchElementException.class,() -> productService.findById(notFoundProductId));
    }

    @Test
    @DisplayName("Should return list of ProductResponse with the provided list of product id")
    void findByIds_case01(){
        List<String> ids = List.of(productSample.getId().toString(),
                productSecondSample.getId().toString());
        List<UUID> uuids = new LinkedList<>();
        for(String id : ids){
            UUID uuid = ExceptionHelper.UUID.fromStringOrElseThrow(id, ExceptionHelper.ServerErrorMessage.INVALID_ID);
            uuids.add(uuid);
        }

        when(productRepository.findAllById(uuids)).thenReturn(productListSample);

        List<ProductResponse> result = productService.findByIds(ids);

        assertNotNull(result);
        assertThat(result.size()).isEqualTo(ids.size());
    }

    @Test
    @DisplayName("Should throw an IllegalArgumentException when an id is invalid")
    void findByIds_case02(){
        List<String> ids = List.of(productSample.getId().toString(),
                "invalid-id");

        assertThrows(IllegalArgumentException.class,() -> productService.findByIds(ids));
    }

//    @Test
//    @DisplayName("Should return ProductResponseCursorPagination of the first page")
//    void getProducts_case01(){
//        int limit = 9;
//        Sort cursorSort = Sort.by(
//                Sort.Order.desc("createdAt"),
//                Sort.Order.desc("id")
//        );
//
//        Specification<Product> finalSpecification = where(ProductSpecification.belongsToCategory(categorySample.getName()));
//        when(productRepository.findAll(finalSpecification, PageRequest.of(0, limit, cursorSort))).thenReturn(pageProductsSample);
//
//        ProductResponseCursorPagination result = productService.getProducts(null,limit,"all",List.of());
//
//        assertNotNull(result);
//        assertThat(result.getData().size()).isEqualTo(productListSample.size());
//    }






}
