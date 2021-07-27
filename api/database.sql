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
  title varchar(255),
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

INSERT INTO Genre (name) VALUES ("Horror");		
INSERT INTO Genre (name) VALUES ("Romance");
INSERT INTO Genre (name) VALUES ("Action");

INSERT INTO Authors (name) VALUES ("Terrence Tao");
INSERT INTO Authors (name) VALUES ("Brett Wortmanz");
INSERT INTO Authors (name) VALUES ("Foo Bar the Third");

INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (11111111111, 1);
INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (22222222222, 2);
INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (33333333333, 3);
INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (44444444444, 3); // Edge Case
INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (55555555555, 4); // Edge Case
INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (55555555555, 4); // Edge Case

INSERT INTO Book_Genre (ISBN_book, id_genre) VALUES (1111111111, 1);
INSERT INTO Book_Genre (ISBN_book, id_genre) VALUES (2222222222, 2);
INSERT INTO Book_Genre (ISBN_book, id_genre) VALUES (3333333333, 3);
INSERT INTO Book_Genre (ISBN_book, id_genre) VALUES (4444444444, 3); //Edge Case
INSERT INTO Book_Genre (ISBN_book, id_genre) VALUES (5555555555, 5); // Edge Case
INSERT INTO Book_Genre (ISBN_book, id_genre) VALUES (5555555555, 5); // Edge Case
