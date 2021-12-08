/**
 * ONLY RUN/MODIFY THIS FILE WHEN CREATING THE DATABASE
 * RECREATES THE DATABASE!!!!! (Deletes all old data)
**/

/* Clears old tables */
DROP TABLE IF EXISTS User, Bookshelf, Bookshelf_Names, Books, Book_Authors, Book_Genre, Authors, Genre, Reviews;


/* Creates our SQL Database */
CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    color_scheme varchar(255) DEFAULT "light"
);

CREATE TABLE Bookshelf_Names (
    shelf_name varchar(255) UNIQUE NOT NULL
);

CREATE TABLE Books (
  ISBN bigint UNIQUE PRIMARY KEY,
  title varchar(255) NOT NULL,
  description TEXT,
  date_published varchar(100)
);

CREATE TABLE Authors (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Genre (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Bookshelf (
    id_user int NOT NULL,
    ISBN bigint NOT NULL,
    shelf_name varchar(255) NOT NULL,
    /* Constraint: If a user is deleted, delete the user's corresponding bookshelves */
    CONSTRAINT USERDELETE
    FOREIGN KEY (id_user)
    REFERENCES User(id)
        ON DELETE CASCADE,
    /* Constraint: If a book is deleted, delete corresponding book data in bookshelves */
    /* Not expecting this to happen often, but functionality is here */
    CONSTRAINT ISBNMATCH
    FOREIGN KEY (ISBN)
    REFERENCES Books(ISBN)
        ON DELETE CASCADE
);

CREATE TABLE Reviews (
  id_review int PRIMARY KEY AUTO_INCREMENT,
  ISBN bigint NOT NULL REFERENCES Books,
  author varchar(255) NOT NULL,
  content varchar(255),
  published date NOT NULL,
  /* Constraint: If a book is deleted, also delete the book's related reviews */
  FOREIGN KEY (ISBN)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);

CREATE TABLE Book_Authors (
  ISBN bigint NOT NULL,
  id_author int NOT NULL REFERENCES Authors,
  /* Constraint: If a book is deleted, also delete book's related authors */
  CONSTRAINT REFBOOK
  FOREIGN KEY (ISBN)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);

CREATE TABLE Book_Genre (
  ISBN bigint NOT NULL REFERENCES Genre,
  id_genre int NOT NULL,
  /* Constraint: If a book is deleted, also delete the book's related genres */
  FOREIGN KEY (ISBN)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);


/* SAMPLE DATA */
INSERT INTO User (username, password, color_scheme) VALUES ("elliot", "$2b$10$U41SKHcvR0YnllxQ7bT89eNm0I8iU/uA.PTOPGlb1v.6R2FAfdwRG", "dark");
INSERT INTO User (username, password) VALUES ("frank", "$2b$10$LAwdabZi8jOU7rmzUYqCf.IUW6iZQyorzo8yW8CDf6dZRmtt2stcy");
INSERT INTO User (username, password) VALUES ("nicholas", "$2b$10$pBksFtv4TFV5.B/zSNZIwe695STLrF22brxR6rSh3KlhrHfn1stve");
INSERT INTO User (username, password) VALUES ("vikram", "$2b$10$JQoXT7nX8N6ob7.ubdWPQOhT2xC8N2Fi01YHDpQ.r3Uq2x8VUR.a2");
INSERT INTO User (username, password) VALUES ("john", "$2b$10$oBqv7hZRNQPNh9kegqIz5ut4QwKEmEV14Y7ZQ.YcRIq2bIUk855AW");
INSERT INTO User (username, password) VALUES ("jane", "$2b$10$LUlfZfjO7a/tKjgFRHYU6e.PlWu2l7/H3/1oAjkb/2iDCf4WxGoG6");

INSERT INTO Bookshelf_Names (shelf_name) VALUES ("reading");
INSERT INTO Bookshelf_Names (shelf_name) VALUES ("want_to_read");
INSERT INTO Bookshelf_Names (shelf_name) VALUES ("read");

INSERT INTO Books (ISBN, title, description, date_published) VALUES (1111111111, "title1", "Long Description1", '2020--12-1');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (2222222222, "title2", "Long Description2", '2020--12-2');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (3333333333, "title3", "Long Description3", '2020--12-3');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (4444444444, "title4", "Long Description4", '2020--12-4');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (5555555555, "title5", "Long Description5", '2020--12-5');
INSERT INTO Books (ISBN, title, description, date_published) VALUES (6666666666, "title6", "Long Description6", '2020--12-6');

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

INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 1111111111, "reading");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 1111111111, "read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 2222222222, "reading");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 3333333333, "want_to_read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (1, 4444444444, "reading");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (2, 5555555555, "want_to_read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (3, 1111111111, "want_to_read");
INSERT INTO Bookshelf (id_user, ISBN, shelf_name) VALUES (2, 4444444444, "reading");

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

/* RUN DELETE STATEMENTS SEPARATELY IF DOING TESTING */
/* Testing Code For Deletion: Should delete the user in table User and its affiliated bookshelf and books */
-- DELETE FROM User WHERE username = "frank";
-- DELETE FROM User WHERE username = "elliot";

/* Remove book from specific user from shelf */
-- DELETE FROM Bookshelf WHERE id_user = 1 AND shelf_name = "reading" AND ISBN = 1111111111;