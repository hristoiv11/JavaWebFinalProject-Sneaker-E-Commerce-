package com.ivanov.mymilestonproject.buisnesslayer;

import com.ivanov.mymilestonproject.presentationlayer.BrandSneakersResponseDTO;

public interface BrandSneakersService {

    BrandSneakersResponseDTO getAllSneakersByBrandId(String brandId);
}
