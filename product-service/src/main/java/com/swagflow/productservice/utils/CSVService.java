package com.swagflow.productservice.utils;

import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.function.Function;


public interface CSVService {

    String FILE_TYPE = "application/vnd.ms-excel";

    static boolean hasCSVFormat(MultipartFile file) {
        if (file.getContentType() == null || file.getContentType().isBlank()) {
            return false;
        }
        return file.getContentType().equals(FILE_TYPE);
    }

    <T> List<T> convert(InputStream is, Function<CSVRecord, T> converter);

    <T> List<T> convert(MultipartFile file, Function<CSVRecord, T> converter);

}
