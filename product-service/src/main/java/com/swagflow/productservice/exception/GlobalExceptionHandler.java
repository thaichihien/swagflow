package com.swagflow.productservice.exception;

import com.swagflow.productservice.exception.response.BadRequestResponse;
import com.swagflow.productservice.exception.response.ForbiddenResponse;
import com.swagflow.productservice.exception.response.HttpExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public HttpExceptionResponse handleInvalidArgument(IllegalArgumentException e){
        //e.printStackTrace();
        return new BadRequestResponse(e.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public HttpExceptionResponse handleNotFoundElement(NoSuchElementException e){
        return new BadRequestResponse(e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public HttpExceptionResponse handleAccessDenied(AccessDeniedException e){
        return new ForbiddenResponse(e.getMessage());
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleUnwantedException(Exception e) {
        log.error(e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown error");
    }
}
