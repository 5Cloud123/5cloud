DROP DATABASE IF EXISTS commentsList;
CREATE DATABASE commentsList;
USE commentsList;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR (25),
  PRIMARY KEY (id),    
);


CREATE TABLE comments (
  id INT AUTO_INCREMENT,
  parent_id INT,
  username_id INT,
  comment VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (username_id),
    REFERENCES users (id)
);