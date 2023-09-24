package com.swagflow.productservice;

import com.swagflow.productservice.category.CategoryService;
import com.swagflow.productservice.product.ProductService;
import com.swagflow.productservice.product.dto.CreateProductDto;
import com.swagflow.productservice.product.dto.SizeDto;
import com.swagflow.productservice.product.dto.UpdateProductDto;
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
    public Product create(CreateProductDto createProductDto) {

        Category category = categoryService.findById(createProductDto.getCategoryId());

        Product created = Product.builder()
                .name(createProductDto.getName())
                .description(createProductDto.getDescription())
                .price(createProductDto.getPrice())
                .category(category)
                .build();

        List<ProductSize> sizes = updateProductSizeOfProduct(createProductDto.getSizes(), created);
        created.setProductSizes(sizes);
        productRepository.product.save(created);
        return created;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> all = productRepository.product.findAll();
        return all;
    }

    @Override
    public Product findById(String id) {
        UUID uuid = UUID.fromString(id);
        Optional<Product> one = productRepository.product.findById(uuid);
        return one.orElseThrow();
    }

    @Override
    public Product update(UpdateProductDto updateProductDto) {
        UUID uuid = UUID.fromString(updateProductDto.getId());
        Product updated = productRepository.product.findById(uuid).orElseThrow();
        updated.setName(updateProductDto.getName());
        updated.setDescription(updateProductDto.getDescription());
        updated.setPrice(updateProductDto.getPrice());
        List<ProductSize> sizes = updateProductSizeOfProduct(updateProductDto.getSizes(), updated);
        updated.setProductSizes(sizes);
        productRepository.product.save(updated);
        return updated;
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

            productRepository.productSize.save(productSize);
            productSizes.add(productSize);
        });

        return productSizes;
    }


}
