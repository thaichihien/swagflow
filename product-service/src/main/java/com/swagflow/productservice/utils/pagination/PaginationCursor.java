package com.swagflow.productservice.utils.pagination;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
public class PaginationCursor {
    private Date createdAt;
    private UUID id;
}
