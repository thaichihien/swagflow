package com.swagflow.productservice.utils;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.io.input.BOMInputStream;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Function;

@Service
public class CSVServiceImpl implements  CSVService{

    @Override
    public <T> List<T> convert(InputStream is, Function<CSVRecord, T> converter) {
        try (BufferedReader bufferedReader =
                     new BufferedReader(new InputStreamReader(BOMInputStream.builder().setInputStream(is).get(), StandardCharsets.UTF_8));
             CSVParser csvParser =
                     new CSVParser(bufferedReader,CSVFormat.RFC4180.builder()
                             .setSkipHeaderRecord(true)
                             .setIgnoreHeaderCase(true)
                             .setTrim(true)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.name)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.category)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.brand)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.description)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.price)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.images)
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.sizes[0])
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.sizes[1])
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.sizes[2])
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.sizes[3])
                             .setHeader(Constants.PRODUCT_CSV_HEADERS.sizes[4])
                             .setHeader()
                             .build())
        ){

            List<T> results = new LinkedList<>();
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            for (CSVRecord record: csvRecords) {
                T row = converter.apply(record);
                results.add(row);
            }

            return results;

        } catch (IOException e) {
            throw new RuntimeException("Unable to parse csv file : " + e.getMessage());
        }
    }

    @Override
    public <T> List<T> convert(MultipartFile file, Function<CSVRecord, T> converter) {
        try {
            return convert(file.getInputStream(),converter);
        } catch (IOException e) {
            throw new RuntimeException("Unable to get input stream from csv file : " + e.getMessage());
        }
    }
}
