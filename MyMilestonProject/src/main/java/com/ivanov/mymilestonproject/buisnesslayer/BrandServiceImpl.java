package com.ivanov.mymilestonproject.buisnesslayer;

import com.ivanov.mymilestonproject.utils.exceptions.InUseException;
import com.ivanov.mymilestonproject.utils.exceptions.NotFoundException;
import com.ivanov.mymilestonproject.dataaccesslayer.Brand;
import com.ivanov.mymilestonproject.dataaccesslayer.BrandRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import com.ivanov.mymilestonproject.presentationlayer.BrandRequestDTO;
import com.ivanov.mymilestonproject.presentationlayer.BrandResponseDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BrandServiceImpl implements BrandService{

    private BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository){

        this.brandRepository=brandRepository;
    }

    @Override
    public List<BrandResponseDTO> getAllBrands() {

        List<Brand> brandEntities = brandRepository.findAll();


        List<BrandResponseDTO> brandResponseDTOList = new ArrayList<>();

        for(Brand brand : brandEntities){
            BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
            BeanUtils.copyProperties(brand, brandResponseDTO);

            brandResponseDTOList.add(brandResponseDTO);
        }

        return brandResponseDTOList;
    }

    @Override
    public BrandResponseDTO getBrandByBrandID(String brandId) {

        Brand brand = brandRepository.findBrandByBrandId(brandId);

        if(brand == null){
            throw new NotFoundException("Unknown directorId: " + brandId);
        }

        BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
        BeanUtils.copyProperties(brand,brandResponseDTO);
        return brandResponseDTO;
    }

    @Override
    public BrandResponseDTO addBrand(BrandRequestDTO brandRequestDTO) {


        Brand brand = new Brand();
        BeanUtils.copyProperties(brandRequestDTO,brand);
        brand.setBrandId(UUID.randomUUID().toString());


        Brand savedBrand = brandRepository.save(brand);


        BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
        BeanUtils.copyProperties(savedBrand,brandResponseDTO);


        return brandResponseDTO;
    }

    @Override
    public BrandResponseDTO updateBrand(BrandRequestDTO brandRequestDTO, String brandId) {

        Brand foundBrand = brandRepository.findBrandByBrandId(brandId);

        if(foundBrand == null){
            throw new NotFoundException("Unknown directorId: " + brandId);
        }


        Brand brand = new Brand();
        BeanUtils.copyProperties(brandRequestDTO,brand);


        brand.setBrandId(foundBrand.getBrandId());
        brand.setId(foundBrand.getId());


        Brand savedBrand = brandRepository.save(brand);


        BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
        BeanUtils.copyProperties(savedBrand,brandResponseDTO);

        return brandResponseDTO ;
    }

    @Override
    public void deleteBrand(String brandId) {
        Brand foundBrand = brandRepository.findBrandByBrandId(brandId);

        if(foundBrand == null){
            throw new NotFoundException("Unknown directorId: " + brandId);
        }

        try{

            brandRepository.delete(foundBrand);

        }catch(DataIntegrityViolationException ex){

            throw new InUseException("Cannot delete brand with brandId:" + brandId
                    + " as it is currently assigned to one or more sneaker.");

        }

    }

}

