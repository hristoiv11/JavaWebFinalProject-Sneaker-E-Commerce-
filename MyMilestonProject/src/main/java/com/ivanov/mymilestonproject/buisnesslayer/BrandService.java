package com.ivanov.mymilestonproject.buisnesslayer;

import com.ivanov.mymilestonproject.presentationlayer.BrandRequestDTO;
import com.ivanov.mymilestonproject.presentationlayer.BrandResponseDTO;

import java.util.List;

public interface BrandService {

    List<BrandResponseDTO> getAllBrands();

    BrandResponseDTO getBrandByBrandID(String brandId);

    BrandResponseDTO addBrand(BrandRequestDTO brandRequestDTO);

    BrandResponseDTO updateBrand(BrandRequestDTO brandRequestDTO, String brandId);

    void deleteBrand(String brandId);

}

