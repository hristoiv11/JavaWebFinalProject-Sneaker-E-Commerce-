package com.ivanov.mymilestonproject.buisnesslayer;

import com.ivanov.mymilestonproject.presentationlayer.SneakerRequestDTO;
import com.ivanov.mymilestonproject.presentationlayer.SneakerResponseDTO;

import java.util.List;

public interface SneakerService {

    List<SneakerResponseDTO> getAllSneakers();

    SneakerResponseDTO getSneakerBySneakerID(String sneakerId);

    SneakerResponseDTO addSneaker(SneakerRequestDTO sneakerRequestDTO);

    SneakerResponseDTO updateSneaker(SneakerRequestDTO sneakerRequestDTO, String sneakerId);

    void deleteSneaker(String sneakerId);
}
