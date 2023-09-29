package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.CreateProductDto;
import com.swagflow.productservice.product.dto.ProductResponse;
import com.swagflow.productservice.product.dto.UpdateProductDto;
import com.swagflow.productservice.product.model.Product;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Tag(name = "Product")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductService productService;

    @Operation(summary = "Create a product")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody CreateProductDto createProductDto){
        return productService.create(createProductDto);
    }

    @Operation(summary = "Get all products")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<? extends ProductResponse> getAllProducts(@RequestParam String view){

        if(view.equals("admin")){
            // - TODO validate admin token
            return productService.getAllFullProducts();
        }

        return productService.getAllProducts();
    }

    @Operation(summary = "Update a product")
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse updateProduct(@RequestBody UpdateProductDto updateProductDto){
        return productService.update(updateProductDto);
    }

    @PutMapping("/image/{id}")
    public ResponseEntity<ProductResponse> uploadImage(
            @RequestParam("file[]") MultipartFile[] file,
            @PathVariable String id
            ){
        return ResponseEntity.ok(productService.uploadProductImages(file,id));
    }


}
