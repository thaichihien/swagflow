package com.swagflow.productservice.messaging.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SimpleRabbiMQRequest<T> {
    private T message;
}
