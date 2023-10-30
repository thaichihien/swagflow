package com.swagflow.productservice.product;

import com.swagflow.productservice.product.dto.*;
import com.swagflow.productservice.utils.CSVService;
import com.swagflow.productservice.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Product")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    private final ProductService productService;

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
    public List<ProductFullResponse> getAllProducts(){
        return productService.getAllFullProducts();
    }

    @Operation(summary = "Get all products by offset")
    @GetMapping("/offset")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponseOffsetPagination getAllProductsForCustomer(
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

    @Operation(summary = "Get all products")
    @GetMapping("/{category}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponseCursorPagination getAllProductsForCustomerInfinity(
            @PathVariable String category,
            @RequestParam(required = false)String next,
            @RequestParam(defaultValue = Constants.PAGINATION.LIMIT_PER_PAGE_STRING)int limit,
            @RequestParam(name = "brand",required = false)List<String> brands
    ){

//        if(category.equals("all")){
//            return  productService.getProducts(next,limit);
//        }
        return productService.getProducts(next,limit,category,brands);
    }

    @Operation(summary = "get product by id")
    @GetMapping("/detail/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductWithId(@PathVariable String id){
        return productService.findById(id);
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
