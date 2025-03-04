package com.swagflow.productservice.account;


import com.swagflow.productservice.messaging.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
@Slf4j
public class AccountHTTPClientService implements AccountService {

    private final RestTemplate restTemplate;

    @Override
    public UserResponse findUserByToken(String token) {
        String url = "http://localhost:3001/api/v1/users/profile";
        ResponseEntity<UserResponse> response = restTemplate.getForEntity(url, UserResponse.class);
        return response.getBody();
    }
}
