package com.ivanov.mymilestonproject.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@NoArgsConstructor
public class BrandSneakersResponseDTO {

        private String brandId;
        private String name;
        private String associatedCelebrity;
        private String founderName;
        private LocalDate dob;
        private String country;
        private String locationOfMainHeadquarters;
        private String imageURL;
        private List<SneakerResponseDTO> sneakers;
}
