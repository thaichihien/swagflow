package com.swagflow.productservice.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductResponseCursorPagination {

    @JsonProperty("next_page")
    private String nextPageCursor;
    @JsonProperty("previous_page")
    private String previousPageCursor;
    private List<SimpleProductResponse> data;
}
