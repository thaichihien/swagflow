package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.product.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size,Long> {
}
