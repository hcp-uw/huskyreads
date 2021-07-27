/**
 * ONLY RUN/MODIFY THIS FILE WHEN CREATING THE DATABASE
 * RECREATES THE DATABASE!!!!! (Deletes all old data)
**/

DROP IF EXISTS User, Bookshelf, Books, Book_Authors, Book_Genre, Authors, Genre, Reviews;

CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) unique,
    password varchar(255),
    color_scheme varchar(255) DEFAULT "light"
);

CREATE TABLE Bookshelf (
    id_user int,
    id_books int,
    shelf_name varchar(255)
);

CREATE TABLE Books (
  id_book int PRIMARY KEY AUTO_INCREMENT,
  ISBN int unique,
  name varchar(255),
  description varchar(255),
  date_published date,
);

CREATE TABLE Book_Authors (
  ISBN_book int,
  id_author int
)

CREATE TABLE Book_Genre (
  ISBN_book int,
  id_genre int
)

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
  id_book int,
  author varchar(255),
  content varchar(255),
  published date
);