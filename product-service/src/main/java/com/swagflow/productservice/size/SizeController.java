package com.swagflow.productservice.size;

import com.swagflow.productservice.size.dto.CreateSizeDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Product Size")
@RestController
@RequestMapping("size")
@RequiredArgsConstructor
@Slf4j
public class SizeController {

    private final SizeService sizeService;

    @Operation
    @PostMapping
    public Size createSize(@RequestBody CreateSizeDto createSizeDto){
        return sizeService.create(createSizeDto);
    }

    @Operation
    @GetMapping
    public List<Size> getAllSizes(){

        return sizeService.getAllSizes();
    }


}
