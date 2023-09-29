package com.swagflow.productservice.product;

import com.swagflow.productservice.brand.Brand;
import com.swagflow.productservice.brand.BrandService;
import com.swagflow.productservice.category.CategoryService;
import com.swagflow.productservice.image.ImageService;
import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductImage;
import com.swagflow.productservice.product.model.ProductSize;
import com.swagflow.productservice.size.Size;
import com.swagflow.productservice.product.repositories.DataRepository;
import com.swagflow.productservice.size.SizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final DataRepository productRepository;
    private final CategoryService categoryService;
    private final BrandService brandService;
    private final SizeService sizeService;

    private final ImageService imageService;


    @Override
    public ProductResponse create(CreateProductDto createProductDto) {

        Category category = categoryService.findById(createProductDto.getCategoryId());
        Brand brand = brandService.findById(createProductDto.getBrandId());

        Product created = Product.builder()
                .name(createProductDto.getName())
                .description(createProductDto.getDescription())
                .price(createProductDto.getPrice())
                .category(category)
                .brand(brand)
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
                .brand(brand.getName())
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

                            ProductResponse.builder().build();

                            return (ProductResponse) ProductResponse.builder()
                                    .id(product.getId())
                                    .name(product.getName())
                                    .description(product.getDescription())
                                    .price(product.getPrice())
                                    .category(product.getCategory().getName())
                                    .brand(product.getBrand().getName())
                                    .sizes(sizeResponses)
                                    .build();
                        }
                ).toList();
    }


    @Override
    public List<ProductFullResponse> getAllFullProducts() {
        return productRepository.getProduct().findAll().stream()
                .map(product -> {
                            List<ProductSizeResponse> sizeResponses = product.getProductSizes().stream().map(sizeProduct ->
                                    new ProductSizeResponse(
                                            sizeProduct.getSize().getName(),
                                            sizeProduct.getQuantity())
                            ).toList();
                            return (ProductFullResponse) ProductFullResponse.builder()
                                    .id(product.getId())
                                    .name(product.getName())
                                    .description(product.getDescription())
                                    .price(product.getPrice())
                                    .category(product.getCategory().getName())
                                    .brand(product.getBrand().getName())
                                    .sizes(sizeResponses)
                                    .createdAt(product.getCreatedAt())
                                    .updatedAt(product.getUpdatedAt())
                                    .build();
                        }
                ).toList();
    }

    @Override
    public ProductResponse findById(String id) {
        UUID uuid = UUID.fromString(id);
        Product one = productRepository.getProduct().findById(uuid).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found with id")
        );
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

    @Override
    public ProductResponse uploadProductImages(MultipartFile[] images, String id) {
        UUID uuid = UUID.fromString(id);
        Product product = productRepository.getProduct().findById(uuid)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, String.format("Product is not found with id : %s", id)));

       for(MultipartFile img : images){
           String imageUrl = imageService.saveImageToClound(img);
           ProductImage productImage = ProductImage.builder().url(imageUrl).product(product).build();

           productRepository.getProductImage().save(productImage);
           product.getImages().add(productImage);
       }

        productRepository.getProduct().save(product);
        List<ProductSizeResponse> sizeResponses = product.getProductSizes().stream().map(sizeProduct ->
                new ProductSizeResponse(
                        sizeProduct.getSize().getName(),
                        sizeProduct.getQuantity())
        ).toList();

        List<String> imgUrls = product.getImages().stream().map(img -> img.getUrl()).toList();

        return  ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .category(product.getCategory().getName())
                .sizes(sizeResponses)
                .images(imgUrls)
                .build();
    }





}
