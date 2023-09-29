package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductSize;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    ProductResponse create(CreateProductDto createProductDto);

    List<ProductResponse> getAllProducts();
    List<ProductFullResponse> getAllFullProducts();

    ProductResponse findById(String id);

    ProductResponse update(UpdateProductDto updateProductDto);

    void delete(String id);

    List<ProductSize> updateProductSizeOfProduct(List<SizeDto> sizeDtos,Product product);

    ProductResponse uploadProductImages(MultipartFile[] image,String id);

}
