package com.swagflow.productservice.brand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swagflow.productservice.product.model.BaseEntity;
import com.swagflow.productservice.product.model.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Brand extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "brand")
    private List<Product> products;
}
