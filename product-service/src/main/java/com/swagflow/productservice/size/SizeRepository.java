package com.swagflow.productservice.size;

import com.swagflow.productservice.size.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SizeRepository extends JpaRepository<Size,Long> {

    Optional<Size> findByName(String name);
}
