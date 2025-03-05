package com.swagflow.productservice.product.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@SuperBuilder
public class ProductResponse extends SimpleProductResponse {
    protected String description;
    protected UUID categoryId;
    protected UUID brandId;
    protected List<ProductSizeResponse> sizes;
}
