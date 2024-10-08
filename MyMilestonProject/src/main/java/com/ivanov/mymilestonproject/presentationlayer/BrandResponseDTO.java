package com.ivanov.mymilestonproject.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class BrandResponseDTO {

        private String brandId;
        private String name;
        private String associatedCelebrity;
        private String founderName;
        private LocalDate dob;
        private String country;
        private String locationOfMainHeadquarters;
        private String imageURL;



    }

