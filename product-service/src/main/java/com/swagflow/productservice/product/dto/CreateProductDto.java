package com.swagflow.productservice.product.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProductDto {
    private String name;
    private String description;
    private Double price;

    @JsonProperty("category_id")
    private String categoryId;

    @JsonProperty("brand_id")
    private String brandId;

    private List<SizeDto> sizes;

}
