package com.swagflow.productservice.utils.pagination;

import org.springframework.beans.factory.annotation.Value;

import java.text.DateFormat;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

public class PaginationCursorEncoderDecoder {

    @Value("{$pagination.cursor.key}")
    private static String secret;

    public static String encode(PaginationCursor cursor){
        String value = cursor.getCreatedAt().getTime() + "#" + secret + "#" + cursor.getId().toString();
        return Base64.getEncoder().encodeToString(value.getBytes());
    }

    public static PaginationCursor decode(String cursorEncoded){
        String cursorDecoded = new String(Base64.getDecoder().decode(cursorEncoded));
        String[] cursorValues = cursorDecoded.split(String.format("#%s#",secret));

        if(cursorValues.length < 2){
            throw new IllegalArgumentException("cursor value is invalid");
        }

        try {
            Date createdAt = new Date(Long.parseLong(cursorValues[0]));
            UUID id = UUID.fromString(cursorValues[1]);
            return new PaginationCursor(createdAt,id);

        } catch (IllegalArgumentException ial) {
            throw new IllegalArgumentException("cursor value is invalid");
        }


    }
}
