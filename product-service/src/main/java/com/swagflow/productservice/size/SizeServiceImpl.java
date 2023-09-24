package com.swagflow.productservice.size;

import com.swagflow.productservice.category.Category;
import com.swagflow.productservice.size.dto.CreateSizeDto;
import com.swagflow.productservice.size.dto.UpdateSizeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SizeServiceImpl implements SizeService{

    private final SizeRepository sizeRepository;

    @Override
    public Size create(CreateSizeDto createSizeDto) {
        Optional<Size> existed = sizeRepository.findByName(createSizeDto.getName());
        if(existed.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Size name is already existed");
        }
        Size created = Size.builder().name(createSizeDto.getName()).build();

        created = sizeRepository.save(created);
        return created;
    }

    @Override
    public List<Size> getAllSizes() {
       return sizeRepository.findAll();
    }

    @Override
    public Size findById(Long id) {
        return sizeRepository.findById(id).orElseThrow();
    }

    @Override
    public Size update(UpdateSizeDto updateSizeDto) {
        return null;
    }

    @Override
    public void delete(String id) {

    }
}
