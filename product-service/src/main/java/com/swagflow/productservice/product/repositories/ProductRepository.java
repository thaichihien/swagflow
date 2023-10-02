package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.product.dto.CreateProductDto;
import com.swagflow.productservice.product.dto.UpdateProductDto;
import com.swagflow.productservice.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;


public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {

    Page<Product> findAllByCategory_Name(String name, Pageable pageable);
    Page<Product> findAllByBrand_Name(String name, Pageable pageable);
}
