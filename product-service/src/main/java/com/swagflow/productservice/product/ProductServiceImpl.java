package com.swagflow.productservice.product;

import com.swagflow.productservice.category.CategoryService;
import com.swagflow.productservice.product.ProductService;
import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductSize;
import com.swagflow.productservice.size.Size;
import com.swagflow.productservice.product.repositories.DataRepository;
import com.swagflow.productservice.size.SizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final DataRepository productRepository;
    private final CategoryService categoryService;
    private final SizeService sizeService;


    @Override
    public ProductResponse create(CreateProductDto createProductDto) {

        Category category = categoryService.findById(createProductDto.getCategoryId());

        Product created = Product.builder()
                .name(createProductDto.getName())
                .description(createProductDto.getDescription())
                .price(createProductDto.getPrice())
                .category(category)
                .build();
        productRepository.getProduct().save(created);

        List<ProductSize> sizes = updateProductSizeOfProduct(createProductDto.getSizes(), created);
        created.setProductSizes(sizes);
        productRepository.getProduct().save(created);

        List<ProductSizeResponse> sizeResponses = sizes.stream().map(sizeProduct ->
                new ProductSizeResponse(
                        sizeProduct.getSize().getName(),
                        sizeProduct.getQuantity())
        ).toList();

        return ProductResponse
                .builder()
                .id(created.getId())
                .name(created.getName())
                .description(created.getDescription())
                .price(created.getPrice())
                .category(category.getName())
                .sizes(sizeResponses)
                .build();
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.getProduct().findAll().stream()
                .map(product -> {
                    List<ProductSizeResponse> sizeResponses = product.getProductSizes().stream().map(sizeProduct ->
                            new ProductSizeResponse(
                                    sizeProduct.getSize().getName(),
                                    sizeProduct.getQuantity())
                    ).toList();
                            return ProductResponse.builder()
                                    .id(product.getId())
                                    .name(product.getName())
                                    .description(product.getDescription())
                                    .price(product.getPrice())
                                    .category(product.getCategory().getName())
                                    .sizes(sizeResponses)
                                    .build();
                        }
                ).toList();

    }

    @Override
    public ProductResponse findById(String id) {
        UUID uuid = UUID.fromString(id);
        Product one = productRepository.getProduct().findById(uuid).orElseThrow();
        List<ProductSizeResponse> sizeResponses = one.getProductSizes().stream().map(sizeProduct ->
                new ProductSizeResponse(
                        sizeProduct.getSize().getName(),
                        sizeProduct.getQuantity())
        ).toList();
        return ProductResponse.builder()
                .id(one.getId())
                .name(one.getName())
                .description(one.getDescription())
                .price(one.getPrice())
                .category(one.getCategory().getName())
                .sizes(sizeResponses)
                .build();
    }

    @Override
    public ProductResponse update(UpdateProductDto updateProductDto) {
        UUID uuid = UUID.fromString(updateProductDto.getId());
        Product updated = productRepository.getProduct().findById(uuid).orElseThrow();
        updated.setName(updateProductDto.getName());
        updated.setDescription(updateProductDto.getDescription());
        updated.setPrice(updateProductDto.getPrice());
        List<ProductSize> sizes = updateProductSizeOfProduct(updateProductDto.getSizes(), updated);
        updated.setProductSizes(sizes);
        productRepository.getProduct().save(updated);

        List<ProductSizeResponse> sizeResponses = sizes.stream().map(sizeProduct ->
                new ProductSizeResponse(
                        sizeProduct.getSize().getName(),
                        sizeProduct.getQuantity())
        ).toList();

        return ProductResponse
                .builder()
                .id(updated.getId())
                .name(updated.getName())
                .description(updated.getDescription())
                .price(updated.getPrice())
                .category(updated.getCategory().getName())
                .sizes(sizeResponses)
                .build();
    }

    @Override
    public void delete(String id) {

    }


    @Override
    public List<ProductSize> updateProductSizeOfProduct(
            List<SizeDto> sizeDtos, Product product) {
        List<ProductSize> productSizes = new ArrayList<>();
        sizeDtos.forEach(sizeDto -> {
            Size size = sizeService.findById(sizeDto.getId());
            ProductSize productSize = ProductSize
                    .builder()
                    .product(product)
                    .size(size)
                    .quantity(sizeDto.getQuantity())
                    .build();

            productRepository.getProductSize().save(productSize);
            productSizes.add(productSize);
        });

        return productSizes;
    }


}
