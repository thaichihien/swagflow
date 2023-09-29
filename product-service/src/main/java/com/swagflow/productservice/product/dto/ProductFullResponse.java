package com.swagflow.productservice.product.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@SuperBuilder
public class ProductFullResponse extends ProductResponse {
    private Date createdAt;
    private Date updatedAt;

}
