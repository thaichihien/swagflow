package com.swagflow.productservice.account;


import com.swagflow.productservice.messaging.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


//@Service
@RequiredArgsConstructor
@Slf4j
public class AccountHTTPClientService implements AccountService {

    private final WebClient webClient;


    public AccountHTTPClientService() {
        this.webClient = WebClient.builder().baseUrl("http://localhost:3001/api/v1").build();
    }

    @Override
    public UserResponse findUserByToken(String token) {
        return webClient.get()
                .uri("/users/profile")
                .headers(headers -> headers.setBearerAuth(token))
                .retrieve()
                .bodyToMono(UserResponse.class).block();
    }
}
