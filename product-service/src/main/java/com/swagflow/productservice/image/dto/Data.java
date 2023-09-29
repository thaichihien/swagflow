package com.swagflow.productservice.image.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Data {
    private String id;
    private String title;
    private String url_viewer;
    private String url;
    private String display_url;
    private String width;
    private String height;
    private String size;
    private String time;
    private String expiration;
    private String delete_url;
}
