package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.product.dto.CreateProductDto;
import com.swagflow.productservice.product.dto.UpdateProductDto;
import com.swagflow.productservice.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface ProductRepository extends JpaRepository<Product, UUID> {
}
