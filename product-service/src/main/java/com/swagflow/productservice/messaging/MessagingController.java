package com.swagflow.productservice.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swagflow.productservice.config.RabbitMQConfig;
import com.swagflow.productservice.exception.EmptyRabbitMQRequestBodyException;
import com.swagflow.productservice.messaging.dto.RabbitMQResponse;
import com.swagflow.productservice.messaging.dto.SimpleRabbiMQRequest;
import com.swagflow.productservice.product.ProductService;
import com.swagflow.productservice.product.dto.ProductResponse;
import com.swagflow.productservice.product.dto.SimpleProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class MessagingController {
    private final RabbitTemplate rabbitTemplate;

    private final ProductService productService;

//    @RabbitListener(queues = RabbitMQConfig.RPC_QUEUE)
//    public Message testRpc(Message message ) throws IOException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        Map<String,Object> received = objectMapper.readValue(message.getBody(), HashMap.class);
//        String value = (String) received.get("mess");
//        System.out.println(value);
//        Map<String,String> reply = new HashMap<>();
//        reply.put("answer","i'm receive:"+ value);
//        Message response = MessageBuilder.withBody(objectMapper.writeValueAsBytes(reply)).build();
//        CorrelationData correlationData = new CorrelationData(message.getMessageProperties().getCorrelationId());
//        //rabbitTemplate.sendAndReceive(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.REPLY_QUEUE, response, correlationData);
//        return response;
//    }


    @RabbitListener(queues = RabbitMQConfig.PRODUCT_DETAIL_QUEUE)
    public RabbitMQResponse<ProductResponse> getProductDetail(SimpleRabbiMQRequest<String> request){

        try {
            String productId = request.getMessage();
            log.info(productId);
            ProductResponse productResponse = productService.findById(productId);

            return RabbitMQResponse.<ProductResponse>builder()
                    .success(true)
                    .message(String.format("product detail with id : %s",productId))
                    .data(productResponse)
                    .build();
        }catch (ResponseStatusException rse){
            log.error(rse.getMessage());
            return RabbitMQResponse.<ProductResponse>builder()
                    .success(false)
                    .message("product is not found")
                    .data(null)
                    .build();
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return RabbitMQResponse.<ProductResponse>builder()
                    .success(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
    }

    @RabbitListener(queues = RabbitMQConfig.PRODUCTS_DETAIL_QUEUE)
    public RabbitMQResponse<List<ProductResponse>> getAllProductsDetail(SimpleRabbiMQRequest<List<String>> request){

        try {
            List<String> productIds = request.getMessage();
            log.info(productIds.toString());

            List<ProductResponse> productResponse = productService.findByIds(productIds);

            return RabbitMQResponse.<List<ProductResponse>>builder()
                    .success(true)
                    .message("all product detail")
                    .data(productResponse)
                    .build();
        }catch (ResponseStatusException rse){
            log.error(rse.getMessage());
            return RabbitMQResponse.<List<ProductResponse>>builder()
                    .success(false)
                    .message("product is not found")
                    .data(null)
                    .build();
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return RabbitMQResponse.<List<ProductResponse>>builder()
                    .success(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
    }






}
