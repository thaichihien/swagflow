package com.swagflow.productservice.account;


import com.swagflow.productservice.messaging.dto.UserResponse;

public interface AccountService {

    UserResponse findUserByToken(String token);
}


