package com.swagflow.productservice.brand;

import com.swagflow.productservice.brand.dto.CreateBrandDto;
import com.swagflow.productservice.brand.dto.UpdateBrandDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Getter
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    @Override
    public Brand create(CreateBrandDto createBrandDto) {
        Optional<Brand> existed = brandRepository.findByName(createBrandDto.getName());
        if (existed.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Brand name is already existed");
        }

        Brand newBrand = Brand.builder().name(createBrandDto.getName()).build();
        brandRepository.save(newBrand);
        return newBrand;
    }

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(String id) {
        UUID brandId;

        try {
            brandId = UUID.fromString(id);
        }catch (IllegalArgumentException e){
            throw new IllegalArgumentException("Invalid id");
        }


        return brandRepository.findById(brandId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,String.format("Brand is not found with id : %s",id)));
    }

    @Override
    public Brand findByName(String name) {
        return brandRepository.findByName(name)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,String.format("Brand is not found with name : %s",name)));
    }

    @Override
    public Brand update(UpdateBrandDto updateBrandDto) {
        UUID brandId = UUID.fromString(updateBrandDto.getId());
        Optional<Brand> existed = brandRepository.findById(brandId);
        if(existed.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Brand with id not found");
        }
        Brand updated = existed.get();
        updated.setName(updateBrandDto.getName());
        brandRepository.save(updated);
        return updated;
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public void clearAll() {
        brandRepository.deleteAll();
    }
}
