package com.ivanov.mymilestonproject.presentationlayer;

import com.ivanov.mymilestonproject.buisnesslayer.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/brands")
public class BrandController {
        private BrandService brandService;

        public BrandController(BrandService brandService) {

            this.brandService= brandService;
        }

        @GetMapping()
        public ResponseEntity<List<BrandResponseDTO>> getBrands(){

            return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllBrands());
        }


        @GetMapping("/{brandId}")
        public ResponseEntity<BrandResponseDTO> getBrandByBrandID(@PathVariable String brandId){

            return ResponseEntity.status(HttpStatus.OK).body(brandService.getBrandByBrandID(brandId));
        }

        @PostMapping()
        public ResponseEntity<BrandResponseDTO> addBrand(@RequestBody BrandRequestDTO brandRequestDTO) {

            return ResponseEntity.status(HttpStatus.CREATED).body(brandService.addBrand(brandRequestDTO));
        }

        @PutMapping("/{brandId}")
        public ResponseEntity<BrandResponseDTO> updateBrand(@RequestBody BrandRequestDTO brandRequestDTO,
                                                  @PathVariable String brandId){

            try{
                BrandResponseDTO updateBrand = brandService.updateBrand(brandRequestDTO,brandId);
                return ResponseEntity.status(HttpStatus.OK).body(updateBrand);
            }
            catch (Exception e){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }

        @DeleteMapping("/{brandId}")
        public ResponseEntity<Void> deleteBrand(@PathVariable String brandId){

            brandService.deleteBrand(brandId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
}
