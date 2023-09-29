package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.product.model.ProductImage;
import org.springframework.data.repository.ListCrudRepository;

import java.util.UUID;

public interface ProductImageRepository extends ListCrudRepository<ProductImage, UUID> {
}
