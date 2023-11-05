package com.swagflow.productservice.exception.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class ForbiddenResponse extends HttpExceptionResponse {
    public ForbiddenResponse(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }

    public ForbiddenResponse(String message, String error) {
        super(HttpStatus.FORBIDDEN, message, error);
    }
}
