package com.swagflow.productservice.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductResponseOffsetPagination {


    @JsonProperty("total_items")
    private long totalItems;
    @JsonProperty("total_pages")
    private int totalPages;
    @JsonProperty("current_page")
    private int currentPage;

    private List<ProductResponse> data;
}
