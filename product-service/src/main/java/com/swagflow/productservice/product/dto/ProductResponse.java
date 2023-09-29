package com.swagflow.productservice.product.dto;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@Data
@SuperBuilder
public class ProductResponse {

    protected UUID id;
    protected String name;
    protected String description;
    protected Double price;
    protected String category;
    protected String brand;
    protected List<ProductSizeResponse> sizes;
    protected List<String> images;
}
