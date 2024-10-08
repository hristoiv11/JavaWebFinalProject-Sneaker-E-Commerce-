package com.ivanov.mymilestonproject.dataaccesslayer;


import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand,Integer> {

    Brand findBrandByBrandId(String brandId);
}
