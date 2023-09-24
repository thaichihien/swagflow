package com.swagflow.productservice.product.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductDto {
    private String name;
    private String description;
    private Double price;

    @JsonProperty("category_id")
    private String categoryId;

    private List<SizeDto> sizes;

}
