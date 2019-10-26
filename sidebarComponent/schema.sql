DROP DATABASE IF EXISTS 5cloud;
CREATE DATABASE 5cloud;

USE 5cloud;

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL,
  user_id VARCHAR(25),
  avatar VARCHAR(150),
  username VARCHAR(25),
  pro_unlimited BOOLEAN DEFAULT 0,
  follower_count INT,
  phys_location VARCHAR(25),
  avatar_url VARCHAR(250),

  PRIMARY KEY(id)
);

CREATE TABLE songs (
  id INT AUTO_INCREMENT NOT NULL,
  song_id VARCHAR(25) NOT NULL,
  song_name VARCHAR(50) NOT NULL,
  artist_name VARCHAR(100) NOT NULL,
  date_posted VARCHAR(25) NOT NULL,
  tag VARCHAR(25) NOT NULL,
  like_count INT(25)  DEFAULT 0,
  play_count INT(25)  DEFAULT 0,
  repost_count INT(25)  DEFAULT 0,
  comment_count INT(25)  DEFAULT 0,
  song_art_url VARCHAR(250),

  PRIMARY KEY(id)
);

CREATE TABLE playlists (
  id INT AUTO_INCREMENT NOT NULL,
  playlist_name VARCHAR(25),
  like_count INT,
  repost_count INT,
  username VARCHAR(50),
  playlist_art VARCHAR(250),

  PRIMARY KEY(id)
);

CREATE TABLE albums (
  id INT AUTO_INCREMENT NOT NULL,
  user VARCHAR(25),
  album_name VARCHAR(25),
  year_posted INT,
  album_art VARCHAR(250),

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

