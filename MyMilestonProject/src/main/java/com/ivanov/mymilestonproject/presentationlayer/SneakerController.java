package com.ivanov.mymilestonproject.presentationlayer;

import com.ivanov.mymilestonproject.buisnesslayer.SneakerService;
import com.ivanov.mymilestonproject.dataaccesslayer.Sneaker;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/sneakers")
public class SneakerController {

    private SneakerService sneakerService;

    public SneakerController(SneakerService sneakerService) {

        this.sneakerService=sneakerService;
    }

    @GetMapping()
    public ResponseEntity<List<SneakerResponseDTO>> getSneakers(){

        return ResponseEntity.status(HttpStatus.OK).body(sneakerService.getAllSneakers());
    }


    @GetMapping("/{sneakerId}")
    public ResponseEntity<SneakerResponseDTO> getSneakersBySneakerID(@PathVariable String sneakerId){

        return ResponseEntity.status(HttpStatus.OK).body(sneakerService.getSneakerBySneakerID(sneakerId));
    }

    @PostMapping()
    public ResponseEntity<SneakerResponseDTO> addSneaker(@RequestBody SneakerRequestDTO sneakerRequestDTO) {

        return ResponseEntity.status(HttpStatus.CREATED).body(sneakerService.addSneaker(sneakerRequestDTO));
    }

    @PutMapping("/{sneakerId}")
    public ResponseEntity<SneakerResponseDTO> updateSneaker(@RequestBody SneakerRequestDTO sneakerRequestDTO,
                                        @PathVariable String sneakerId){

        try{
            SneakerResponseDTO updateSneaker = sneakerService.updateSneaker(sneakerRequestDTO,sneakerId);
            return ResponseEntity.status(HttpStatus.OK).body(updateSneaker);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    @DeleteMapping("/{sneakerId}")
    public ResponseEntity<Void> deleteSneaker(@PathVariable String sneakerId){

        sneakerService.deleteSneaker(sneakerId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

    }

}

