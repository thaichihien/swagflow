package com.swagflow.productservice.messaging.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RabbitMQResponse<T> {
    private boolean success;
    private String message;
    private T data;

}
