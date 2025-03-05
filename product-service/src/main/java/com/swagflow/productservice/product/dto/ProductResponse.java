package com.swagflow.productservice.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@SuperBuilder
public class ProductResponse extends SimpleProductResponse {
    protected String description;

    @JsonProperty("category_id")
    protected UUID categoryId;

    @JsonProperty("brand_id")
    protected UUID brandId;
    protected List<ProductSizeResponse> sizes;
}
