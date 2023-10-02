package com.swagflow.productservice.product;

import com.swagflow.productservice.brand.Brand;
import com.swagflow.productservice.brand.BrandServiceImpl;
import com.swagflow.productservice.brand.dto.CreateBrandDto;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.category.CategoryServiceImpl;
import com.swagflow.productservice.category.dto.CreateCategoryDto;
import com.swagflow.productservice.exception.ExceptionHelper;
import com.swagflow.productservice.image.ImageService;
import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductImage;
import com.swagflow.productservice.product.model.ProductSize;
import com.swagflow.productservice.product.repositories.DataRepository;
import com.swagflow.productservice.size.Size;
import com.swagflow.productservice.size.SizeService;
import com.swagflow.productservice.utils.CSVService;
import com.swagflow.productservice.utils.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final DataRepository productRepository;
    private final CategoryServiceImpl categoryService;
    private final BrandServiceImpl brandService;
    private final SizeService sizeService;
    private final ImageService imageService;
    private final CSVService csvService;


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
        created = productRepository.getProduct().save(created);

        List<ProductSize> sizes = updateProductSizeOfProduct(createProductDto.getSizes(), created);

        created.setProductSizes(sizes);
        productRepository.getProduct().save(created);

        List<ProductSizeResponse> sizeResponses = convertProductQuantity(sizes, false);

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
    public Integer importProducts(MultipartFile file) {

        HashMap<String, Category> tempCategory = new HashMap<>();
        HashMap<String, Brand> tempBrand = new HashMap<>();
        List<ProductSize> sizes = new LinkedList<>();
        List<ProductImage> images = new LinkedList<>();

        List<Product> products = csvService.convert(file, (record) -> {

            Category category;
            Brand brand;

            String categoryString = record.get(Constants.PRODUCT_CSV_HEADERS.category);
            String brandString = record.get(Constants.PRODUCT_CSV_HEADERS.brand);
            if (tempCategory.containsKey(categoryString)) {
                category = tempCategory.get(categoryString);
            } else {
                Optional<Category> existed = categoryService.getCategoryRepository().findByName(categoryString);
                category = existed.orElseGet(() -> categoryService.create(new CreateCategoryDto(categoryString)));
                tempCategory.put(categoryString, category);
            }

            if (tempBrand.containsKey(brandString)) {
                brand = tempBrand.get(brandString);
            } else {
                Optional<Brand> existed = brandService.getBrandRepository().findByName(brandString);
                brand = existed.orElseGet(() -> brandService.create(new CreateBrandDto(brandString)));
                tempBrand.put(brandString, brand);
            }
            double price = ExceptionHelper.Double.parseDoubleOrElseThrow(
                    record.get(Constants.PRODUCT_CSV_HEADERS.price),"Invalid value at price column"
            );

            Product created = Product.builder()
                    .name(record.get(Constants.PRODUCT_CSV_HEADERS.name))
                    .description(record.get(Constants.PRODUCT_CSV_HEADERS.description))
                    .price(price)
                    .category(category)
                    .brand(brand)
                    .build();

            List<ProductSize> productSizes = updateProductSizeOfProduct(record, created);
            List<ProductImage> productImages = getImageFromColumn(record.get(Constants.PRODUCT_CSV_HEADERS.images),created);
            sizes.addAll(productSizes);
            images.addAll(productImages);

            return created;
        });
        productRepository.getProduct().saveAll(products);
        productRepository.getProductSize().saveAll(sizes);
        productRepository.getProductImage().saveAll(images);

        return products.size();
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.getProduct().findAll().stream()
                .map(this::convertProductToProductResponse).toList();
    }


    @Override
    public List<ProductFullResponse> getAllFullProducts() {
        return productRepository.getProduct().findAll().stream()
                .map(product -> {
                            List<ProductSizeResponse> sizeResponses = convertProductQuantity(product.getProductSizes());
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
    public ProductResponse findById(String id, boolean isAdmin) {
        UUID uuid = ExceptionHelper.UUID.fromStringOrElseThrow(id,ExceptionHelper.ServerErrorMessage.INVALID_ID);

        Product one = productRepository.getProduct().findById(uuid).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found with id")
        );
        List<ProductSizeResponse> sizeResponses = convertProductQuantity(one.getProductSizes(), true);

        List<String> imgUrls = one.getImages().stream().map(ProductImage::getUrl).toList();
        if (isAdmin) {
            return ProductResponse.builder()
                    .id(one.getId())
                    .name(one.getName())
                    .description(one.getDescription())
                    .price(one.getPrice())
                    .category(one.getCategory().getId().toString())
                    .brand(one.getBrand().getId().toString())
                    .sizes(sizeResponses)
                    .images(imgUrls)
                    .build();
        } else {
            return ProductResponse.builder()
                    .id(one.getId())
                    .name(one.getName())
                    .description(one.getDescription())
                    .price(one.getPrice())
                    .category(one.getCategory().getName())
                    .brand(one.getId().toString())
                    .sizes(sizeResponses)
                    .build();
        }
    }

    @Override
    public ProductResponse update(UpdateProductDto updateProductDto) {
        UUID uuid = ExceptionHelper.UUID.fromStringOrElseThrow(updateProductDto.getId(),ExceptionHelper.ServerErrorMessage.INVALID_ID);
        Product updated = productRepository.getProduct().findById(uuid).orElseThrow();
        updated.setName(updateProductDto.getName());
        updated.setDescription(updateProductDto.getDescription());
        updated.setPrice(updateProductDto.getPrice());
        List<ProductSize> sizes = updateProductSizeOfProduct(updateProductDto.getSizes(), updated);
        updated.setProductSizes(sizes);
        productRepository.getProduct().save(updated);

        List<ProductSizeResponse> sizeResponses = convertProductQuantity(sizes);


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
        UUID uuid = ExceptionHelper.UUID.fromStringOrElseThrow(id,ExceptionHelper.ServerErrorMessage.INVALID_ID);
        productRepository.getProduct().deleteById(uuid);
    }

    @Override
    public void delete(String[] ids) {
        for (String id : ids) {
            delete(id);
        }
    }

    @Override
    public void deleteAll() {
        productRepository.getProduct().deleteAll();
    }
    @Override
    public void deleteAll(boolean database) {
       deleteAll();
        if(database){
            categoryService.clearAll();
            brandService.clearAll();
            //productRepository.getProductImage().deleteAll();
        }
    }


    private List<ProductSize> updateProductSizeOfProduct(
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

    private List<ProductSize> updateProductSizeOfProduct(
            CSVRecord record, Product product) {
        List<ProductSize> productSizes = new ArrayList<>();

        for (String sizeHeader : Constants.PRODUCT_CSV_HEADERS.sizes) {
            int quantity = ExceptionHelper.Integer.parseIntOrElseThrow(record.get(sizeHeader)
                    ,String.format("Invalid value at column : %s",sizeHeader));

            if (quantity <= 0) {
                continue;
            }

            Size size = sizeService.findByName(sizeHeader);
            ProductSize productSize = ProductSize
                    .builder()
                    .product(product)
                    .size(size)
                    .quantity(quantity)
                    .build();
            //productRepository.getProductSize().save(productSize);
            productSizes.add(productSize);
        }
        return productSizes;
    }

    @Override
    public ProductResponse uploadProductImages(MultipartFile[] images, String id) {
        UUID uuid = UUID.fromString(id);
        Product product = productRepository.getProduct().findById(uuid)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, String.format("Product is not found with id : %s", id)));

        for (MultipartFile img : images) {
            String imageUrl = imageService.saveImageToClound(img);
            ProductImage productImage = ProductImage.builder().url(imageUrl).product(product).build();

            productRepository.getProductImage().save(productImage);
            product.getImages().add(productImage);
        }

        productRepository.getProduct().save(product);
        List<ProductSizeResponse> sizeResponses = convertProductQuantity(product.getProductSizes());

        List<String> imgUrls = product.getImages().stream().map(ProductImage::getUrl).toList();

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .category(product.getCategory().getName())
                .sizes(sizeResponses)
                .images(imgUrls)
                .build();
    }

    private ProductResponse convertProductToProductResponse(Product product){
        List<ProductSizeResponse> sizeResponses = convertProductQuantity(product.getProductSizes());

        ProductResponse.builder().build();

        return (ProductResponse) ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .category(product.getCategory().getName())
                .brand(product.getBrand().getName())
                .sizes(sizeResponses)
                .images(product.getImages().stream().map(ProductImage::getUrl).toList())
                .build();
    }


    private List<ProductSizeResponse> convertProductQuantity(List<ProductSize> productSizes) {
        return convertProductQuantity(productSizes, false);
    }

    private List<ProductSizeResponse> convertProductQuantity(List<ProductSize> productSizes, boolean includeId) {
        return productSizes.stream().map(sizeProduct -> {

                    var responseBuilder = ProductSizeResponse.builder()
                            .name(sizeProduct.getSize().getName())
                            .quantity(sizeProduct.getQuantity());

                    if (includeId) {
                        responseBuilder.id(sizeProduct.getSize().getId().toString());
                    }
                    return responseBuilder.build();
                }

        ).toList();
    }


    private List<ProductImage> getImageFromColumn(String imageArray,Product product) {
        String[] imageUrls = imageArray.split(",");
        List<ProductImage> result = new LinkedList<>();

        for (String imgUrl : imageUrls) {
            if (!ImageService.isImageExtension(imgUrl)) {
                throw new IllegalArgumentException(String.format("Invalid image url at product : %s",product.getName()));
            }

            ProductImage productImage = ProductImage.builder().url(imgUrl).product(product).build();

            result.add(productImage);
        }

        return result;
    }


    @Override
    public ProductResponsePagination getProducts(int page, int limit, Sort sort) {

        Pageable pageable = PageRequest.of(page,limit,sort);

        Page<Product> productPage = productRepository.getProduct().findAll(pageable);
        return ProductResponsePagination.builder()
                .data(productPage.getContent().stream().map(this::convertProductToProductResponse).toList())
                .currentPage(page)
                .totalItems(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .build();
    }

    @Override
    public ProductResponsePagination getProducts(int page, int limit) {
        return getProducts(page,limit,Sort.by("updated_at").descending());
    }
}
