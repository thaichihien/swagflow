package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.brand.Brand;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.product.model.Product;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

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


}
