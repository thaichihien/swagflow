package com.swagflow.productservice.messaging.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RabbitMQResponse<T> {
    private boolean success;
    private String message;
    private T data;

}
