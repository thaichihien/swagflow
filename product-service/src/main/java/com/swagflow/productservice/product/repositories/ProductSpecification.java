package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.product.model.Product;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    static public Specification<Product> belongsToCategory(String category){
        return (root, query, criteriaBuilder) -> {
            Join<Product,Category> categoryJoin = root.join("category");
            return criteriaBuilder.equal(categoryJoin.get("name"),category);
        };
    }


}
