DROP DATABASE IF EXISTS commentsList;
CREATE DATABASE commentsList;
USE commentsList;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR (25),
  follower_count INT,
  pro_user_status BOOLEAN DEFAULT 0,
  user_avatar VARCHAR(150),
  user_location VARCHAR(30),
  PRIMARY KEY (id),    
);


CREATE TABLE comments (
  id INT AUTO_INCREMENT,
  parent_id INT,
  username_id INT,
  comment VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (username_id),
    REFERENCES users (id),
  song_id INT,
  FOREIGN KEY (song_id),
    REFERENCES songs (id)
);

CREATE TABLE songs (
  id INT AUTO_INCREMENT,
  song_title VARCHAR(25),
  PRIMARY KEY (id)
);