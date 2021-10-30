
DROP TABLE IF EXISTS User, Bookshelf, Bookshelf_Names, Books, Book_Authors, Book_Genre, Authors, Genre, Reviews;

CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) unique,
    password varchar(255),
    color_scheme varchar(255) DEFAULT "light"
);

CREATE TABLE Bookshelf (
    id_user int REFERENCES User,
    ISBN bigint REFERENCES Books,
    shelf_name varchar(255)
);

CREATE TABLE Bookshelf_Names (
    shelf_name varchar(255) unique
);

CREATE TABLE Books (
  ISBN bigint unique PRIMARY KEY,
  title varchar(255),
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
  name varchar(255)
);

CREATE TABLE Genre (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255)
);

CREATE TABLE Reviews (
  id_review int PRIMARY KEY AUTO_INCREMENT,
  ISBN bigint REFERENCES Books,
  author varchar(255),
  content varchar(255),
  published date
);

INSERT INTO Books (ISBN, title, description, date_published) VALUES (1111111111, "title1", "Long Description1", '2020--12-1');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (2222222222, "title2", "Long Description2", '2020--12-2');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (3333333333, "title3", "Long Description3", '2020--12-3');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (4444444444, "title4", "Long Description4", '2020--12-4');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (5555555555, "title5", "Long Description5", '2020--12-5');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (6666666666, "title6", "Long Description6", '2020--12-6');

INSERT INTO Book_Authors (ISBN, id_author) VALUES (1111111111, 1);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (2222222222, 2);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (3333333333, 3);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (4444444444, 3);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (5555555555, 4);
INSERT INTO Book_Authors (ISBN, id_author) VALUES (5555555555, 3);

INSERT INTO Book_Genre (ISBN, id_genre) VALUES (1111111111, 1);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (2222222222, 2);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (3333333333, 3);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (4444444444, 3);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (5555555555, 5);
INSERT INTO Book_Genre (ISBN, id_genre) VALUES (5555555555, 4);

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