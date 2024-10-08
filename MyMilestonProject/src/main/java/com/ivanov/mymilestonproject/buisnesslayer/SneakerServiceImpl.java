package com.ivanov.mymilestonproject.buisnesslayer;

import com.ivanov.mymilestonproject.utils.exceptions.NotFoundException;
import com.ivanov.mymilestonproject.dataaccesslayer.Brand;
import com.ivanov.mymilestonproject.dataaccesslayer.BrandRepository;
import com.ivanov.mymilestonproject.dataaccesslayer.Sneaker;
import com.ivanov.mymilestonproject.dataaccesslayer.SneakerRepository;
import org.springframework.beans.BeanUtils;
import com.ivanov.mymilestonproject.presentationlayer.BrandResponseDTO;
import com.ivanov.mymilestonproject.presentationlayer.SneakerRequestDTO;
import com.ivanov.mymilestonproject.presentationlayer.SneakerResponseDTO;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SneakerServiceImpl implements SneakerService{

    private SneakerRepository sneakerRepository;
    private BrandRepository brandRepository;

    public SneakerServiceImpl(SneakerRepository sneakerRepository,BrandRepository brandRepository){

        this.sneakerRepository = sneakerRepository;
        this.brandRepository = brandRepository;
    }

    @Override
    public List<SneakerResponseDTO> getAllSneakers() {

        List<Sneaker> sneakerEntities = sneakerRepository.findAll();


        List<SneakerResponseDTO> sneakerResponseDTOList = new ArrayList<>();

        for(Sneaker sneaker: sneakerEntities){
            SneakerResponseDTO sneakerResponseDTO = new SneakerResponseDTO();
            BeanUtils.copyProperties(sneaker, sneakerResponseDTO);

            BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
            BeanUtils.copyProperties(sneaker.getBrand(),brandResponseDTO);
            sneakerResponseDTO.setBrand(brandResponseDTO);

            sneakerResponseDTOList.add(sneakerResponseDTO);
        }

        return sneakerResponseDTOList;
    }

    @Override
    public SneakerResponseDTO getSneakerBySneakerID(String sneakerId) {

        Sneaker sneaker = sneakerRepository.findSneakerBySneakerId(sneakerId);

        if(sneaker == null){
            throw new NotFoundException("Unknown movieId: " + sneakerId);
        }

        SneakerResponseDTO sneakerResponseDTO = new SneakerResponseDTO();
        BeanUtils.copyProperties(sneaker,sneakerResponseDTO);

        BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
        BeanUtils.copyProperties(sneaker.getBrand(),brandResponseDTO);
        sneakerResponseDTO.setBrand(brandResponseDTO);

        return sneakerResponseDTO;
    }

    @Override
    public SneakerResponseDTO addSneaker(SneakerRequestDTO sneakerRequestDTO) {


        Brand foundBrand = brandRepository.findBrandByBrandId(sneakerRequestDTO.getBrandId());

        if(foundBrand == null){
            throw new NotFoundException("Unknown brandId: " + sneakerRequestDTO.getBrandId());
        }

        Sneaker sneaker = new Sneaker();
        BeanUtils.copyProperties(sneakerRequestDTO,sneaker);
        sneaker.setSneakerId(UUID.randomUUID().toString());

        sneaker.setBrand(foundBrand);


        Sneaker savedSneaker = sneakerRepository.save(sneaker);


        SneakerResponseDTO sneakerResponseDTO = new SneakerResponseDTO();
        BeanUtils.copyProperties(savedSneaker,sneakerResponseDTO);
        BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
        BeanUtils.copyProperties(savedSneaker.getBrand(),brandResponseDTO);

        sneakerResponseDTO.setBrand(brandResponseDTO);

        return sneakerResponseDTO;
    }

    @Override
    public SneakerResponseDTO updateSneaker(SneakerRequestDTO sneakerRequestDTO, String sneakerId) {

        Sneaker foundSneaker = sneakerRepository.findSneakerBySneakerId(sneakerId);

        if(foundSneaker == null){
            throw new NotFoundException("Unknown sneakerId: " + sneakerId);
        }


        Sneaker sneaker = new Sneaker();
        BeanUtils.copyProperties(sneakerRequestDTO,sneaker);
        sneaker.setSneakerId(foundSneaker.getSneakerId());
        sneaker.setId(foundSneaker.getId());

        Brand brand= brandRepository.findBrandByBrandId(sneakerRequestDTO.getBrandId());
        sneaker.setBrand(brand);

        Sneaker savedSneaker = sneakerRepository.save(sneaker);

        SneakerResponseDTO sneakerResponseDTO = new SneakerResponseDTO();
        BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
        BeanUtils.copyProperties(sneaker.getBrand(), brandResponseDTO);
        sneakerResponseDTO.setBrand(brandResponseDTO);
        BeanUtils.copyProperties(savedSneaker,sneakerResponseDTO);

        return sneakerResponseDTO ;
    }

    @Override
    public void deleteSneaker(String sneakerId) {
        Sneaker foundSneaker = sneakerRepository.findSneakerBySneakerId(sneakerId);

        if(foundSneaker == null){
            throw new NotFoundException("Unknown sneakerId: " + sneakerId);
        }
        sneakerRepository.delete(foundSneaker);
    }


}




