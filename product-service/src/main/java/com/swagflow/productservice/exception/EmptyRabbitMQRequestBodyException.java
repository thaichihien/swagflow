package com.swagflow.productservice.exception;

public class EmptyRabbitMQRequestBodyException extends Exception{
    public  EmptyRabbitMQRequestBodyException(){
        super("the message body is empty");
    }
}
