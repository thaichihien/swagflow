package com.swagflow.productservice.exception.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class BadRequestResponse extends HttpExceptionResponse{
    public BadRequestResponse( String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }

    public BadRequestResponse(String message, String error) {
        super(HttpStatus.BAD_REQUEST, message, error);
    }
}
