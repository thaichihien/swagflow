package com.swagflow.productservice.category.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCategoryDto {
    private UUID id;
    private String name;
}
