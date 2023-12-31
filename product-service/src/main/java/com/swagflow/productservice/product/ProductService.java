package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.product.model.ProductSize;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService extends ProductServicePagination {

    ProductResponse create(CreateProductDto createProductDto);

    Integer importProducts(MultipartFile file);

    List<ProductResponse> getAllProducts();
    List<ProductFullResponse> getAllFullProducts();

    ProductResponse findById(String id);

    List<ProductResponse> findByIds(List<String> ids);

    ProductResponse update(UpdateProductDto updateProductDto);

    void delete(String id);
    void delete(String[] ids);

    void deleteAll();
    void deleteAll(boolean database);


    ProductResponse uploadProductImages(MultipartFile[] images,String id);


}
