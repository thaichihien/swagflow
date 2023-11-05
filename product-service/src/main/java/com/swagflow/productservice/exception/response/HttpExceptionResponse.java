package com.swagflow.productservice.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

import java.time.LocalDateTime;

@Setter
@Getter
public class HttpExceptionResponse {
    @JsonProperty("status_code")
    private int statusCode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;

    public HttpExceptionResponse(HttpStatusCode httpStatusCode,String message){
        timestamp = LocalDateTime.now();
        

    }


}
