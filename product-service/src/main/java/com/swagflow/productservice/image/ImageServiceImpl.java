package com.swagflow.productservice.image;

import com.swagflow.productservice.image.dto.ImgbbResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class ImageServiceImpl implements  ImageService{

    private final WebClient webClient;
    private final String apiKey;

    public ImageServiceImpl(
            @Value("${services.api.imgbb.url}")
            String imageServerUrl,
            @Value("${services.api.imgbb.key}")
            String apiKey){
        this.apiKey = apiKey;
        this.webClient = WebClient.builder().baseUrl(imageServerUrl).build();
    }

    @Override
    public String saveImageToClound(MultipartFile file) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("image", file.getResource());

        ImgbbResponse response =  webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/upload").queryParam("key",apiKey).build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .onStatus(HttpStatusCode::isError,clientResponse -> {
                    String errorBody =clientResponse.bodyToMono(String.class).block();
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                            String.format("status : %s - %s",clientResponse.statusCode(),errorBody));
                })

                .bodyToMono(ImgbbResponse.class)
                .block();
        return response.getData().getUrl();
    }


}
