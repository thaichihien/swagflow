package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.CreateProductDto;
import com.swagflow.productservice.product.dto.ProductResponse;
import com.swagflow.productservice.product.dto.SizeDto;
import com.swagflow.productservice.product.dto.UpdateProductDto;
import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductSize;

import java.util.List;

public interface ProductService {

    ProductResponse create(CreateProductDto createProductDto);

    List<ProductResponse> getAllProducts();

    ProductResponse findById(String id);

    ProductResponse update(UpdateProductDto updateProductDto);

    void delete(String id);

    List<ProductSize> updateProductSizeOfProduct(List<SizeDto> sizeDtos,Product product);


}
