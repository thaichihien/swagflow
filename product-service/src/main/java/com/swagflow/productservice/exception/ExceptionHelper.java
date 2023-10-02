package com.swagflow.productservice.exception;

import java.util.UUID;

/**
 *
 *  A class help to catch exception and define the error message clearly
 */
public class ExceptionHelper {

    public static class ServerErrorMessage{
        public static String INVALID_ID = "Invalid id";
        public static String INVALID_QUANTITY = "Invalid quantity";
        public static String INVALID_PRICE = "Invalid price";
    }

    public static class UUID {
        public static java.util.UUID fromStringOrElseThrow(String name,String errorMessage){
            try {
                return java.util.UUID.fromString(name);
            }catch (IllegalArgumentException e){
                throw new IllegalArgumentException(errorMessage);
            }
        }
    }

    public static class Integer{
        public static int parseIntOrElseThrow(String s, String errorMessage){
            try{
                return java.lang.Integer.parseInt(s);
            }catch (NumberFormatException e){
                throw new IllegalArgumentException(errorMessage);
            }
        }
    }

    public static class Double{
        public static double parseDoubleOrElseThrow(String s, String errorMessage){
            try{
                return java.lang.Double.parseDouble(s);
            }catch (NumberFormatException e){
                throw new IllegalArgumentException(errorMessage);
            }
        }
    }


}
