package com.swagflow.productservice.utils;

import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;


public interface CSVService {


    Set<String> fileTypeSet = Set.of("application/vnd.ms-excel", "text/csv");

    static boolean hasCSVFormat(MultipartFile file) {

        if (file.getContentType() == null || file.getContentType().isBlank()) {
            return false;
        }
        return fileTypeSet.contains(file.getContentType());
    }

    <T> List<T> convert(InputStream is, Function<CSVRecord, T> converter);

    <T> List<T> convert(MultipartFile file, Function<CSVRecord, T> converter);

}
