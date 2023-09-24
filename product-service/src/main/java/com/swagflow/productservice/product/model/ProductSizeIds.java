package com.swagflow.productservice.product.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
public class ProductSizeIds implements Serializable {

    @JoinColumn(name = "product_id")
    private UUID product;

    @JoinColumn(name = "size_id")
    private Long size;
}
