DROP DATABASE IF EXISTS 5cloud_song_display;

CREATE DATABASE 5cloud_song_display;

USE 5cloud_song_display;

CREATE TABLE songs
(
    Id INT
        NOT NULL
    AUTO_INCREMENT KEY,
    song_id VARCHAR
    (255) UNIQUE,
    song_name VARCHAR
    (255),
    artist_name VARCHAR
    (255),
    upload_time BIGINT,
    tag VARCHAR
    (255),
    song_art_url VARCHAR
    (255),
    song_data_url VARCHAR
    (255),
    background_light VARCHAR
    (255),
    background_dark VARCHAR
    (255),
    waveform_data JSON,
    song_duration INT
);

    CREATE TABLE comments
    (
        Id INT
            NOT NULL
        AUTO_INCREMENT KEY,
    song_id VARCHAR
        (20),
    user_name VARCHAR
        (255),
    time_stamp INT,
    comment VARCHAR
        (255)
);
