package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.brand.Brand;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.product.model.Product;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.UUID;

public class ProductSpecification {

    static public Specification<Product> belongsToCategory(String category){
        return (root, query, criteriaBuilder) -> {
            Join<Product,Category> categoryJoin = root.join("category");
            return criteriaBuilder.equal(categoryJoin.get("name"),category);
        };
    }

    static public Specification<Product> inTheseBrand(List<String> brands){
        return (root, query, criteriaBuilder) -> {
            Join<Product, Brand> brandJoin = root.join("brand");
            return brandJoin.get("name").in(brands);
        };
    }

    static public Specification<Product> hasIds(List<String> ids){
        return (root, query, criteriaBuilder) -> {
            List<UUID> uuidList = ids.stream()
                    .map(UUID::fromString)  // Convert String to UUID
                    .toList();

            return root.get("id").in(uuidList);
        };
    }


}
