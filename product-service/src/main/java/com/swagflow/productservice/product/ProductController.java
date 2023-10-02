package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.product.model.Product;
import com.swagflow.productservice.utils.CSVService;
import com.swagflow.productservice.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.badRequest;

@Tag(name = "Product")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
@Slf4j
public class ProductController {
    private final ProductService productService;
    private final CSVService csvService;

    @Operation(summary = "Create a product")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody CreateProductDto createProductDto){
        return productService.create(createProductDto);
    }

    @Operation(summary = "Import list of products from csv file")
    @PostMapping("/import")
    public ResponseEntity<String> importProductsFromFile(
            @RequestParam("file") MultipartFile file
    ){
        if(CSVService.hasCSVFormat(file)){
            Integer addedNum = productService.importProducts(file);
            return new ResponseEntity<String>(addedNum.toString(),HttpStatus.CREATED);
        }

        return  ResponseEntity.badRequest().body("Invalid csv file");
    }

    @Operation(summary = "Get all products (for admin)")
    @GetMapping("/admin")
    @ResponseStatus(HttpStatus.OK)
    public List<? extends ProductResponse> getAllProducts(@RequestParam String view){

        if(view != null && view.equals("admin")){
            // - TODO validate admin token
            return productService.getAllFullProducts();
        }

        return productService.getAllProducts();
    }

    @Operation(summary = "Get all products")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ProductResponsePagination getAllProductsForCustomer(
            @RequestParam(defaultValue = "1")int page,
            @RequestParam(defaultValue = Constants.PAGINATION.LIMIT_PER_PAGE_STRING)int limit
            ){

        if(page <= 0){
            page = 0;
        }else{
            page -= 1;
        }

        return productService.getProducts(page,limit);
    }

    @Operation(summary = "get product by id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductWithId(@PathVariable String id,@RequestParam String view){

        if(view != null && view.equals("admin")){
            // - TODO validate admin token
            return productService.findById(id,true);
        }

        return productService.findById(id,false);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable String id){
        productService.delete(id);
        return ResponseEntity.ok("delete successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteProducts(
            @RequestBody DeleteProductsDto deleteProductsDto,
            @RequestParam(required = false)String all){

        // TODO validate admin

        if(all != null && all.equals("true")){
            productService.deleteAll();
        }else{
            productService.delete(deleteProductsDto.getProducts());
        }
        return ResponseEntity.ok("delete successfully");
    }

    @Operation(summary = "Clear all data include products, categories, brands,...")
    @DeleteMapping("/db")
    public ResponseEntity<String> deleteProducts(){

        // TODO validate admin

        productService.deleteAll(true);

        return ResponseEntity.ok("delete successfully");
    }


}
