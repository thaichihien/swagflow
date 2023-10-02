package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.ProductResponsePagination;
import org.springframework.data.domain.Sort;

public interface ProductServicePagination {

    ProductResponsePagination getProducts(int page, int limit, Sort sort);
    ProductResponsePagination getProducts(int page, int limit);

}
