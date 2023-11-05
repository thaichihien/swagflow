package com.swagflow.productservice.config;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static String EXCHANGE_NAME;
    public static final String PRODUCT_DETAIL_QUEUE = "product-detail-queue";
    public static final String PRODUCTS_DETAIL_QUEUE = "products-detail-queue";

    public static final String ACCOUNT_QUEUE = "account-queue";

    private final CachingConnectionFactory cachingConnectionFactory;

    public  RabbitMQConfig(CachingConnectionFactory cachingConnectionFactory){
        this.cachingConnectionFactory = cachingConnectionFactory;
    }


    @Value("${services.rabbitmq.exchange-name}")
    private void setExchangeName(String exchangeName){
        RabbitMQConfig.EXCHANGE_NAME = exchangeName;
    }


    @Bean
    TopicExchange exchange(){
        return  new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    Queue productDetailQueue() {
        return new Queue(PRODUCT_DETAIL_QUEUE);
    }
    @Bean
    Queue productsDetailQueue() {
        return new Queue(PRODUCTS_DETAIL_QUEUE);
    }

    @Bean
    Binding productDetailQueueBinding(){
        return BindingBuilder.bind(productDetailQueue()).to(exchange()).with(PRODUCT_DETAIL_QUEUE);
    }
    @Bean
    Binding productsDetailQueueBinding(){
        return BindingBuilder.bind(productsDetailQueue()).to(exchange()).with(PRODUCTS_DETAIL_QUEUE);
    }

    @Bean
    public Jackson2JsonMessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(Jackson2JsonMessageConverter converter){
        RabbitTemplate template = new RabbitTemplate(cachingConnectionFactory);
        template.setMessageConverter(converter);

        return template;
    }

}
