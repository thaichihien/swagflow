package com.swagflow.productservice.size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swagflow.productservice.product.model.BaseEntity;
import com.swagflow.productservice.product.model.ProductSize;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Size extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "size",cascade = CascadeType.ALL)
    private List<ProductSize> products;

}
