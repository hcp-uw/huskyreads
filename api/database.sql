/**
 * ONLY RUN/MODIFY THIS FILE WHEN CREATING THE DATABASE
 * RECREATES THE DATABASE!!!!! (Deletes all old data)
**/

DROP TABLE IF EXISTS User, Bookshelf, Books, Book_Authors, Book_Genre, Authors, Genre, Reviews;

CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) unique,
    password varchar(255),
    color_scheme varchar(255) DEFAULT "light"
);

CREATE TABLE Bookshelf (
    id_user int REFERENCES User,
    ISBN int REFERENCES Books,
    shelf_name varchar(255)
);

CREATE TABLE Books (
  ISBN int PRIMARY KEY,
  name varchar(255),
  description TEXT,
  date_published date
);

CREATE TABLE Book_Authors (
  ISBN_book int REFERENCES Books,
  id_author int REFERENCES Authors
);

CREATE TABLE Book_Genre (
  ISBN_book int REFERENCES Books,
  id_genre int REFERENCES Genre
);

CREATE TABLE Authors (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255)
);

CREATE TABLE Genre (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255)
);

CREATE TABLE Reviews (
  id_review int PRIMARY KEY AUTO_INCREMENT,
  id_book int REFERENCES Books,
  author varchar(255),
  content varchar(255),
  published date
);

