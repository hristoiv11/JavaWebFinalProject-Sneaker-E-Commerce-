package com.ivanov.mymilestonproject.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SneakerRepository extends JpaRepository<Sneaker,Integer> {

    Sneaker findSneakerBySneakerId(String sneakerId);
    List<Sneaker> findSneakersByBrand_BrandId(String brandId);
}
