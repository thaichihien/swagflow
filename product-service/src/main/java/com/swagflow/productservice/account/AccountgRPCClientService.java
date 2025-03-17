package com.swagflow.productservice.account;

import com.swagflow.productservice.AccountServiceGrpc;
import com.swagflow.productservice.getAccountRequest;
import com.swagflow.productservice.getAccountResponse;
import com.swagflow.productservice.messaging.dto.UserResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.stereotype.Service;


@Service
public class AccountgRPCClientService implements AccountService {
    @Override
    public UserResponse findUserByToken(String token) {
        ManagedChannel managedChannel = ManagedChannelBuilder.forAddress("localhost", 5000).usePlaintext().build();

        AccountServiceGrpc.AccountServiceBlockingStub blockingStub = AccountServiceGrpc.newBlockingStub(managedChannel);

        getAccountResponse response = blockingStub.getAccountByToken(getAccountRequest.newBuilder().setToken(token).build());

        System.out.println("from gRPC");
        System.out.println(response);

        return UserResponse.builder().id(response.getId())
                .roles(response.getRolesList())
                .email(response.getEmail())
                .firstName(response.getFirstName())
                .lastName(response.getLastName())
                .build();
    }


}
