package com.swagflow.productservice.utils.pagination;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@RequiredArgsConstructor
public class PageSpecification<T> implements Specification<T> {
    private final Date createdAt;
    private final UUID uuid;

    @Override
    public Predicate toPredicate(Root root, @NonNull CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
        Predicate createdAtLessThan = criteriaBuilder.lessThan(root.get("createdAt"), createdAt);
        Predicate createdAtEqual = criteriaBuilder.equal(root.get("createdAt"), createdAt);
        Predicate uuidLessThan = criteriaBuilder.lessThan(root.get("id"), uuid);
        return criteriaBuilder.or(createdAtLessThan,criteriaBuilder.and(createdAtEqual, uuidLessThan));
    }
}
