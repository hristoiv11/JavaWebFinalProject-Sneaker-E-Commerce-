package com.ivanov.mymilestonproject.presentationlayer;

import com.ivanov.mymilestonproject.buisnesslayer.BrandSneakersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/brands/{brandId}/sneakers")
public class BrandSneakersController {

        private BrandSneakersService brandSneakersService;

        public BrandSneakersController(BrandSneakersService brandSneakersService) {
           this.brandSneakersService=brandSneakersService;
        }

        @GetMapping
        public ResponseEntity<BrandSneakersResponseDTO> getAllSneakersForBrand(@PathVariable String brandId){

            return ResponseEntity.status(HttpStatus.OK).body(brandSneakersService.getAllSneakersByBrandId(brandId));
        }
}
