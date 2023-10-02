package com.swagflow.productservice.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String saveImageToClound(MultipartFile file);

    static boolean isImageExtension(String filename) {

        if (filename.length() < 4) {
            return false;
        }

        String extension = filename.substring(filename.length() - 4);
        if (extension.equals("jpeg")) {
            return true;
        } else {
            extension = extension.substring(1);
        }

        return extension.equals("jpg") || extension.equals("png") || extension.equals("gif");
    }


}
