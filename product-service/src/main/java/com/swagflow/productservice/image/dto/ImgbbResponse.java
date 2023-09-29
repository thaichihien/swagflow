package com.swagflow.productservice.image.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImgbbResponse {

    private Data data;
    private boolean success;
    private int status;

}
