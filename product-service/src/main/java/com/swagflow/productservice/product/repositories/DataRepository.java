package com.swagflow.productservice.product.repositories;

import com.swagflow.productservice.size.SizeRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@RequiredArgsConstructor
@Getter
public class DataRepository {

    private final ProductRepository product;
    private final ProductSizeRepository productSize;
    private final ProductImageRepository productImage;

}
