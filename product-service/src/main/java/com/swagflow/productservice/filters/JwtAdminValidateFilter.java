package com.swagflow.productservice.filters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swagflow.productservice.config.RabbitMQConfig;
import com.swagflow.productservice.messaging.dto.RabbitMQResponse;
import com.swagflow.productservice.messaging.dto.SimpleRabbiMQRequest;
import com.swagflow.productservice.messaging.dto.UserResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAdminValidateFilter extends OncePerRequestFilter {


    private final RabbitTemplate rabbitTemplate;
    ObjectMapper mapper = new ObjectMapper();
    @Override
    protected void doFilterInternal
            (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String token = extractJwtFromHeaderBearer(request.getHeader(HttpHeaders.AUTHORIZATION));

        //log.info(token);
        UserResponse userResponse = validateJwtAdmin(token);

        if(userResponse != null){
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            userResponse.getFirstName(), null, userResponse.getRoles().stream().map(role -> {
                                return new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());
                    }).toList());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }


        filterChain.doFilter(request, response);

    }

    private UserResponse validateJwtAdmin(String token) throws JsonProcessingException {
        if(token == null){
            return null;
        }
        SimpleRabbiMQRequest<String> tokenRequest = SimpleRabbiMQRequest.<String>builder().message(token).build();
        Message tokenMessage = MessageBuilder.withBody(mapper.writeValueAsBytes(tokenRequest)).build();
        Message result = rabbitTemplate.sendAndReceive(RabbitMQConfig.EXCHANGE_NAME,RabbitMQConfig.ACCOUNT_QUEUE,tokenMessage);

        if(result != null){
            String jsonString= new String(result.getBody());
            RabbitMQResponse<UserResponse> response = mapper.readValue(jsonString, new TypeReference<>() {
            });

            log.info(response.getMessage());
            if(!response.isSuccess()){
                return null;
            }

            return response.getData();
        }
        return null;
    }


    private String extractJwtFromHeaderBearer(String header) {
        //log.info(header);
        if (header == null || !header.startsWith("Bearer")) {
            return null;
        }

        return header.substring(7);
    }
}
