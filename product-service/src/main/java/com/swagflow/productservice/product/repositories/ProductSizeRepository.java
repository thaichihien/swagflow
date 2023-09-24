package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.product.model.ProductSize;
import com.swagflow.productservice.product.model.ProductSizeIds;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSizeRepository extends JpaRepository<ProductSize, ProductSizeIds> {
}
