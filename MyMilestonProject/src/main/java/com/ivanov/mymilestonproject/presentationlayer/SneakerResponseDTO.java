package com.ivanov.mymilestonproject.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SneakerResponseDTO {

        private String sneakerId;
        private String model;
        private String price;
        private String releaseYear;
        private String availableStore;
        private String imageURL;

        private BrandResponseDTO brand;
}

    