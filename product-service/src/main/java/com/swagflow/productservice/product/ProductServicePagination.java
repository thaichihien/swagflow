package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.ProductResponseCursorPagination;
import com.swagflow.productservice.product.dto.ProductResponseOffsetPagination;
import org.springframework.data.domain.Sort;

public interface ProductServicePagination {

    ProductResponseOffsetPagination getProducts(int page, int limit, Sort sort);
    ProductResponseOffsetPagination getProducts(int page, int limit);

    ProductResponseCursorPagination getProducts(String nextCursor,int limit);

}
