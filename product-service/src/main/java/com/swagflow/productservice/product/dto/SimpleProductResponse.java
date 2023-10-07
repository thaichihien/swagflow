package com.swagflow.productservice.product.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@SuperBuilder
public class SimpleProductResponse {
    protected UUID id;
    protected String name;

    protected Double price;
    protected String category;
    protected String brand;
    protected List<String> images;
}
