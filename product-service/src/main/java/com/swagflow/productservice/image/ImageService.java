package com.swagflow.productservice.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String saveImageToClound(MultipartFile file);
}
