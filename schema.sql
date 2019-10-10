DROP DATABASE IF EXISTS 5cloud;
CREATE DATABASE 5cloud;

USE 5cloud;

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL,
  avatar BLOB,
  username VARCHAR(25),
  pro_unlimited BOOLEAN DEFAULT 0,
  follower_count INT,
  phys_location VARCHAR(25),

  PRIMARY KEY(id)
);

CREATE TABLE songs (
  id INT AUTO_INCREMENT NOT NULL,
  like_count INT DEFAULT 0,
  play_count INT DEFAULT 0,
  repost_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  artist VARCHAR(25),
  title VARCHAR(50),
  song_art BLOB,
  added DATE,

  PRIMARY KEY(id)
);

CREATE TABLE playlists (
  id INT AUTO_INCREMENT NOT NULL,
  like_count INT,
  repost_count INT,

  PRIMARY KEY(id)
);

CREATE TABLE hashtags (
  id INT AUTO_INCREMENT NOT NULL,
  tag VARCHAR(25),
  uses INT DEFAULT 0,

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

CREATE TABLE hashtag_song_assignments (
  id INT AUTO_INCREMENT NOT NULL,
  hashtag INT NOT NULL,
  song INT NOT NULL,
  FOREIGN KEY (hashtag)
    REFERENCES hashtags(id)
    ON DELETE CASCADE,
  FOREIGN KEY (song)
    REFERENCES songs(id)
    ON DELETE CASCADE,

  PRIMARY KEY(id)
);