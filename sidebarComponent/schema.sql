DROP DATABASE IF EXISTS 5cloud;
CREATE DATABASE 5cloud;

USE 5cloud;

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL,
  avatar VARCHAR(150),
  username VARCHAR(25),
  pro_unlimited BOOLEAN DEFAULT 0,
  follower_count INT,
  phys_location VARCHAR(25),

  PRIMARY KEY(id)
);

CREATE TABLE songs (
  id INT AUTO_INCREMENT NOT NULL,
  song_id VARCHAR(25) NOT NULL,
  like_count INT DEFAULT 0,
  play_count INT DEFAULT 0,
  repost_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  artist_name VARCHAR(25),
  song_name VARCHAR(50),
  song_art VARCHAR(150),
  date_posted DATE,
  tag VARCHAR(25),

  PRIMARY KEY(id)
);

CREATE TABLE playlists (
  id INT AUTO_INCREMENT NOT NULL,
  like_count INT,
  repost_count INT,

  PRIMARY KEY(id)
);

CREATE TABLE albums (
  id INT AUTO_INCREMENT NOT NULL,
  user VARCHAR(25),
  album_name VARCHAR(25),
  year_posted INT,

  PRIMARY KEY(id)
);



CREATE TABLE song_user_likes (
  id INT AUTO_INCREMENT NOT NULL,
  user INT NOT NULL,
  song INT NOT NULL,
  FOREIGN KEY (user) 
    REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (song)
    REFERENCES songs(id)
    ON DELETE CASCADE,

  PRIMARY KEY(id)
);

CREATE TABLE song_user_reposts (
  id INT AUTO_INCREMENT NOT NULL,
  user INT NOT NULL,
  song INT NOT NULL,
  FOREIGN KEY (user) 
    REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (song)
    REFERENCES songs(id)
    ON DELETE CASCADE,

  PRIMARY KEY(id)
);

CREATE TABLE playlist_song_included (
  id INT AUTO_INCREMENT NOT NULL,
  playlist INT NOT NULL,
  song INT NOT NULL,
  FOREIGN KEY (playlist) 
    REFERENCES playlists(id)
    ON DELETE CASCADE,
  FOREIGN KEY (song)
    REFERENCES songs(id)
    ON DELETE CASCADE,

  PRIMARY KEY(id)
);

CREATE TABLE album_song_included (
  id INT AUTO_INCREMENT NOT NULL,
  album INT NOT NULL,
  song INT NOT NULL,
  FOREIGN KEY (album) 
    REFERENCES albums(id)
    ON DELETE CASCADE,
  FOREIGN KEY (song)
    REFERENCES songs(id)
    ON DELETE CASCADE,

  PRIMARY KEY(id)
);

