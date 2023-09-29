package com.swagflow.productservice.brand;

import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface BrandRepository extends ListCrudRepository<Brand, UUID> {

    Optional<Brand> findByName(String name);
}
