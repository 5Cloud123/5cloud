DROP DATABASE IF EXISTS musicDB;

CREATE DATABASE musicDB;

USE musicDB;

-- CREATE TABLE artists(
-- id INT AUTO_INCREMENT NOT NULL,
-- artistName varchar(25) NOT NULL ,
-- UNIQUE (artistName),
-- PRIMARY KEY (id)
-- );

CREATE TABLE songs(
    id INT AUTO_INCREMENT,
    songName VARCHAR(255) NOT NULL,
    songId VARCHAR (255) UNIQUE,
    songNameURL varchar(255), 
    songArtURL varchar(255),
    artistName varchar(255) NOT NULL,
    duration INT,
    -- artistId INT NOT NULL,
    -- FOREIGN KEY (artistId)
    --     REFERENCES artists(id),
    PRIMARY KEY (id)
);

