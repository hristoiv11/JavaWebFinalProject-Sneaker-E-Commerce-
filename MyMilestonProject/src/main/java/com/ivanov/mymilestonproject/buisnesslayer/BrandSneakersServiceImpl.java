package com.ivanov.mymilestonproject.buisnesslayer;

import com.ivanov.mymilestonproject.dataaccesslayer.SneakerRepository;
import com.ivanov.mymilestonproject.utils.exceptions.NotFoundException;
import com.ivanov.mymilestonproject.dataaccesslayer.Brand;
import com.ivanov.mymilestonproject.dataaccesslayer.BrandRepository;
import com.ivanov.mymilestonproject.dataaccesslayer.Sneaker;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.ivanov.mymilestonproject.presentationlayer.BrandResponseDTO;
import com.ivanov.mymilestonproject.presentationlayer.BrandSneakersResponseDTO;
import com.ivanov.mymilestonproject.presentationlayer.SneakerResponseDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandSneakersServiceImpl implements BrandSneakersService{


    private BrandRepository brandRepository;
    private SneakerRepository sneakerRepository;

    public BrandSneakersServiceImpl(BrandRepository brandRepository, SneakerRepository sneakerRepository) {
        this.brandRepository = brandRepository;
        this.sneakerRepository=sneakerRepository;
    }

    @Override
    public BrandSneakersResponseDTO getAllSneakersByBrandId(String brandId) {

        Brand foundBrand = brandRepository.findBrandByBrandId(brandId);

        if(foundBrand == null){
            throw  new NotFoundException("Unknown brand id: " + brandId);
        }

        BrandSneakersResponseDTO brandSneakersResponseDTO = new BrandSneakersResponseDTO();
        BeanUtils.copyProperties(foundBrand, brandSneakersResponseDTO);

        List<Sneaker> sneakersList = sneakerRepository.findSneakersByBrand_BrandId(brandId);

        List<SneakerResponseDTO> sneakerResponseDTOList = new ArrayList<>();

        for(Sneaker sneaker: sneakersList){
            SneakerResponseDTO sneakerResponseDTO = new SneakerResponseDTO();
            BeanUtils.copyProperties(sneaker,sneakerResponseDTO);

            BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
            BeanUtils.copyProperties(sneaker.getBrand(),brandResponseDTO);
            sneakerResponseDTO.setBrand(brandResponseDTO);
            sneakerResponseDTOList.add(sneakerResponseDTO);

        }

        brandSneakersResponseDTO.setSneakers((sneakerResponseDTOList));

        return brandSneakersResponseDTO;
    }
}

