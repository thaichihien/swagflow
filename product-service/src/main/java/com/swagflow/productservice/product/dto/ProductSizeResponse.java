package com.swagflow.productservice.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSizeResponse {

    @JsonIgnore
    private String id;
    private String name;
    private Integer quantity;

}
