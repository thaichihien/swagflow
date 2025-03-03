package com.swagflow.productservice.utils;

import org.springframework.data.jpa.domain.Specification;

import java.util.LinkedList;
import java.util.List;

public class SpecificationBuilder<T> {

    private final List<Specification<T>> specificationList = new LinkedList<>();

    public SpecificationBuilder<T> addAndIfExist(boolean checked, Specification<T> other) {
        if (checked) {
            specificationList.add(other);
        }

        return this;
    }


    public Specification<T> build() {
        if (specificationList.isEmpty()) {
            return Specification.where(null);
        }
        Specification<T> result = Specification.where(specificationList.getFirst());
        for (Specification<T> specification : specificationList) {
            result.and(specification);
        }

        return result;
    }

}
