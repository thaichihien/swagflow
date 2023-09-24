package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.product.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
