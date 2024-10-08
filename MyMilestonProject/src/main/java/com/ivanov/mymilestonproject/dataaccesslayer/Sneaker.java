package com.ivanov.mymilestonproject.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "sneakers")
@Data
@NoArgsConstructor

public class Sneaker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "sneakerid")
    private String sneakerId;

    @Column(name = "model")
    private String model;

    @Column(name = "price")
    private String price;

    @Column(name = "releaseyear")
    private String releaseYear;

    @Column(name = "availablestore")
    private String availableStore;

    @Column(name = "imageurl")
    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "brandid", referencedColumnName = "brandid")

    private Brand brand;


}
