package com.swagflow.productservice.product.model;

import com.swagflow.productservice.size.Size;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_size")
@IdClass(ProductSizeIds.class)
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSize {

    @Id
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Id
    @ManyToOne
    @JoinColumn(name = "size_id", referencedColumnName = "id")
    private Size size;

    private Integer quantity;

}
