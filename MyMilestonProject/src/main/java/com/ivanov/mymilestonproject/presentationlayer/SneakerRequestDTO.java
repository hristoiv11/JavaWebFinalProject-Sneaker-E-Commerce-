package com.ivanov.mymilestonproject.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SneakerRequestDTO {


        private String model;
        private String price;
        private String releaseYear;
        private String availableStore;
        private String imageURL;
        private String brandId;

    }

