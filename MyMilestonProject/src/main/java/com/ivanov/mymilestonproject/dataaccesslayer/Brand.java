package com.ivanov.mymilestonproject.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "brands")
@Data
@NoArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "brandid")
    private String brandId;

    @Column(name = "name")
    private String name;

    @Column(name = "associatedcelebrity")
    private String associatedCelebrity;

    @Column(name = "foundername")
    private String founderName;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "country")
    private String country;

    @Column(name = "locationofmainheadquarters")
    private String locationOfMainHeadquarters;

    @Column(name = "imageurl")
    private String imageURL;

    @OneToMany(mappedBy = "brand")
    private Set<Sneaker> sneakers;


}
