/**
 * ONLY RUN/MODIFY THIS FILE WHEN CREATING THE DATABASE
 * RECREATES THE DATABASE!!!!! (Deletes all old data)
**/

/* Clears old tables */
DROP TABLE IF EXISTS User, Bookshelf, Bookshelf_Names, Books, Book_Authors, Book_Genre, Authors, Genre, Reviews;


/* Creates our SQL Database */
CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) unique NOT NULL,
    password varchar(255) NOT NULL,
    color_scheme varchar(255) DEFAULT "light"
);

CREATE TABLE Bookshelf (
    id_user int REFERENCES User,
    ISBN bigint REFERENCES Books,
    shelf_name varchar(255) NOT NULL
);

CREATE TABLE Bookshelf_Names (
    shelf_name varchar(255) unique NOT NULL
);

CREATE TABLE Books (
  ISBN bigint unique PRIMARY KEY,
  title varchar(255) NOT NULL,
  description TEXT,
  date_published date
);

CREATE TABLE Book_Authors (
  ISBN bigint REFERENCES Books,
  id_author int REFERENCES Authors
);

CREATE TABLE Book_Genre (
  ISBN bigint REFERENCES Books,
  id_genre int REFERENCES Genre
);

CREATE TABLE Authors (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Genre (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Reviews (
  id_review int PRIMARY KEY AUTO_INCREMENT,
  ISBN bigint REFERENCES Books,
  author varchar(255),
  content varchar(255),
  published date
);

/* SAMPLE DATA */
INSERT INTO User (username, password, color_scheme) VALUES ("elliot", "pass1", "dark");
INSERT INTO User (username, password) VALUES ("frank", "pass2");
INSERT INTO User (username, password) VALUES ("nicholas", "pass3");
INSERT INTO User (username, password) VALUES ("vikram", "pass4");
INSERT INTO User (username, password) VALUES ("john", "pass5");
INSERT INTO User (username, password) VALUES ("jane", "pass6");

INSERT INTO Bookshelf_Names (shelf_name) VALUES ("reading");
INSERT INTO Bookshelf_Names (shelf_name) VALUES ("want_to_read");
INSERT INTO Bookshelf_Names (shelf_name) VALUES ("read");

INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 1111111111, "reading");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 1111111111, "read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 2222222222, "reading");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 3333333333, "want_to_read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 4444444444, "reading");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (2, 5555555555, "want_to_read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (3, 1111111111, "want_to_read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (2, 4444444444, "reading");

INSERT INTO Books (ISBN, title, description, date_published) VALUES (1111111111, "title1", "Long Description1", '2020--12-1');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (2222222222, "title2", "Long Description2", '2020--12-2');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (3333333333, "title3", "Long Description3", '2020--12-3');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (4444444444, "title4", "Long Description4", '2020--12-4');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (5555555555, "title5", "Long Description5", '2020--12-5');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (6666666666, "title6", "Long Description6", '2020--12-6');

INSERT INTO Book_Authors (ISBN, id_author) VALUES (1111111111, 1);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (2222222222, 2);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (3333333333, 3);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (4444444444, 3); /* Edge Case */
INSERT INTO Book_Authors (ISBN, id_author) VALUES (5555555555, 4); /* Edge Case */
INSERT INTO Book_Authors (ISBN, id_author) VALUES (5555555555, 3); /* Edge Case */

INSERT INTO Book_Genre (ISBN, id_genre) VALUES (1111111111, 1);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (2222222222, 2);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (3333333333, 3);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (4444444444, 3);  /* Edge Case */
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (5555555555, 5); /* Edge Case */
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (5555555555, 4); /* Edge Case */

INSERT INTO Authors (name) VALUES ("Terrence Tao");
INSERT INTO Authors (name) VALUES ("Brett Wortmanz");
INSERT INTO Authors (name) VALUES ("Foo Bar the Third");
INSERT INTO Authors (name) VALUES ("Suzzy Collins");
INSERT INTO Authors (name) VALUES ("Albert Einstein");

INSERT INTO Genre (name) VALUES ("Horror");
INSERT INTO Genre (name) VALUES ("Romance");
INSERT INTO Genre (name) VALUES ("Action");
INSERT INTO Genre (name) VALUES ("Young Adult");
INSERT INTO Genre (name) VALUES ("Thriller");