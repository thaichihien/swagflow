package com.swagflow.productservice.exception.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

import java.time.LocalDateTime;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HttpExceptionResponse {
    @JsonProperty("status_code")
    private int statusCode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "hh:mm:ss dd-MM-yyyy")
    private LocalDateTime timestamp;
    private String message;
    private String error;

    public HttpExceptionResponse(HttpStatusCode httpStatusCode,String message){
        timestamp = LocalDateTime.now();
        this.statusCode = httpStatusCode.value();
        this.message = message;
        this.error = null;
    }

    public HttpExceptionResponse(HttpStatusCode httpStatusCode,String message,String error){
        timestamp = LocalDateTime.now();
        this.statusCode = httpStatusCode.value();
        this.message = message;
        this.error = error;
    }
}
