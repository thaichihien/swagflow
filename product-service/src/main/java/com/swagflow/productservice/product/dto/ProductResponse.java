package com.swagflow.productservice.product.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProductResponse {

    private UUID id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private List<ProductSizeResponse> sizes;
}
