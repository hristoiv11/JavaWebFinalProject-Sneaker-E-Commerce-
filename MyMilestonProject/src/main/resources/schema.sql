drop table brands if exists;
create table brands (
                           id INT NOT NULL AUTO_INCREMENT,
                           brandid VARCHAR(36) NOT NULL UNIQUE,
                           name VARCHAR(255) NOT NULL,
                           associatedcelebrity VARCHAR(255) NOT NULL,
                           foundername VARCHAR(255) NOT NULL,
                           dob DATE NOT NULL,
                           country VARCHAR(255) NOT NULL,
                           locationofmainheadquarters VARCHAR(255) NOT NULL ,
                           imageurl VARCHAR(255),
                           PRIMARY KEY (id)
);
drop table sneakers if exists;
create table sneakers (
                        id INT NOT NULL AUTO_INCREMENT,
                        sneakerid VARCHAR(36) NOT NULL UNIQUE,
                        model VARCHAR(255) NOT NULL,
                        price VARCHAR(255),
                        releaseyear VARCHAR(255),
                        availablestore VARCHAR(255) NOT NULL,
                        imageurl VARCHAR(500),
                        brandid VARCHAR(36) NOT NULL,
                        PRIMARY KEY (id),
                        FOREIGN KEY (brandid) references brands(brandid)
);

