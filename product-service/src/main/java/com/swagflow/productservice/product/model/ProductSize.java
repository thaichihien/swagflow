package com.swagflow.productservice.product.model;

import com.swagflow.productservice.size.Size;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_size")
@IdClass(ProductSizeIds.class)
@Data
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
