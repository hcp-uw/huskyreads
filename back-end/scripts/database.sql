/**
 * ONLY RUN/MODIFY THIS FILE WHEN CREATING THE DATABASE
 * RECREATES THE DATABASE!!!!! (Deletes all old data)
**/

/* Clears old tables */
DROP TABLE IF EXISTS
Users, Books, Reviews, Bookshelves, Bookshelf_Books, Authors, Genres, Book_Authors, Book_Genres
;


/* Creates our SQL Database */
CREATE TABLE Users (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    color_scheme varchar(255) DEFAULT "light"
);

CREATE TABLE Books (
  ISBN bigint UNIQUE PRIMARY KEY,
  title varchar(255) NOT NULL,
  description TEXT,
  date_published varchar(100)
);

CREATE TABLE Reviews (
  id_review int PRIMARY KEY AUTO_INCREMENT,
  ISBN_book bigint NOT NULL REFERENCES Books(ISBN),
  id_user int NOT NULL,
  content varchar(255),
  published date NOT NULL,
  CONSTRAINT USERDELETED
  FOREIGN KEY (id_user)
  REFERENCES Users(id)
    ON DELETE CASCADE,
  /* Constraint: If a book is deleted, also delete the book's related reviews */
  CONSTRAINT BOOKDELETED
  FOREIGN KEY (ISBN_book)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);

/* Default per user, insert:
 * read, reading, want_to_read
 * as three separate bookshelves into this table
 */
CREATE TABLE Bookshelves (
    id int PRIMARY KEY AUTO_INCREMENT,
    id_user int NOT NULL,
    shelf_name varchar(255) NOT NULL,
    /* Constraint: If a user is deleted, delete the user's corresponding bookshelves */
    CONSTRAINT USERDELETE
    FOREIGN KEY (id_user)
    REFERENCES Users(id)
        ON DELETE CASCADE
);

CREATE TABLE Bookshelf_Books (
    id_bookshelf int,
    ISBN bigint NOT NULL,
    /* Constraint: If a bookshelf is deleted, delete the bookshelf's book connections */
    CONSTRAINT SHELFDELETE
    FOREIGN KEY (id_bookshelf)
    REFERENCES Bookshelves(id)
        ON DELETE CASCADE,
    /* Constraint: If a book is deleted, delete corresponding book data in bookshelves */
    /* Not expecting this to happen often, but functionality is here */
    CONSTRAINT ISBNMATCH
    FOREIGN KEY (ISBN)
    REFERENCES Books(ISBN)
        ON DELETE CASCADE
);

CREATE TABLE Authors (
  id varchar(40) NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE Genres (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
 );

CREATE TABLE Book_Authors (
  ISBN_book bigint NOT NULL,
  id_author varchar(40) REFERENCES Authors(id),
  /* Constraint: If a book is deleted, also delete book's related authors */
  CONSTRAINT REFBOOK
  FOREIGN KEY (ISBN_book)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);

CREATE TABLE Book_Genres (
  ISBN_book bigint NOT NULL,
  id_genre int NOT NULL REFERENCES Genres(id),
  /* Constraint: If a book is deleted, also delete the book's genre connections */
  FOREIGN KEY (ISBN_book)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);


-- SELECT @@auto_increment_increment;
SET auto_increment_increment = 1;
-- SELECT @@auto_increment_offset;
SET auto_increment_offset = 1;


/* SAMPLE DATA */
INSERT INTO Users (username, password, color_scheme) VALUES
    ("elliot", "$2b$10$U41SKHcvR0YnllxQ7bT89eNm0I8iU/uA.PTOPGlb1v.6R2FAfdwRG", "dark");
INSERT INTO Users (username, password) VALUES
    ("frank", "$2b$10$LAwdabZi8jOU7rmzUYqCf.IUW6iZQyorzo8yW8CDf6dZRmtt2stcy"),
    ("nicholas", "$2b$10$pBksFtv4TFV5.B/zSNZIwe695STLrF22brxR6rSh3KlhrHfn1stve"),
    ("vikram", "$2b$10$JQoXT7nX8N6ob7.ubdWPQOhT2xC8N2Fi01YHDpQ.r3Uq2x8VUR.a2"),
    ("john", "$2b$10$oBqv7hZRNQPNh9kegqIz5ut4QwKEmEV14Y7ZQ.YcRIq2bIUk855AW"),
    ("jane", "$2b$10$LUlfZfjO7a/tKjgFRHYU6e.PlWu2l7/H3/1oAjkb/2iDCf4WxGoG6")
;

INSERT INTO Books (ISBN, title, description, date_published) VALUES
    (1111111111, "title1", "Long Description1", '2020--12-1'),
    (2222222222, "title2", "Long Description2", '2020--12-2'),
    (3333333333, "title3", "Long Description3", '2020--12-3'),
    (4444444444, "title4", "Long Description4", '2020--12-4'),
    (5555555555, "title5", "Long Description5", '2020--12-5'),
    (6666666666, "title6", "Long Description6", '2020--12-6')
;

INSERT INTO Reviews (ISBN_book, id_user, content, published) VALUES
    (1111111111, 1, "wow not that bad", CURDATE()),  /* CURDATE() puts in current date */
    (2222222222, 2, "interesting book!", CURDATE())
;

INSERT INTO Bookshelves (id_user, shelf_name) VALUES
    (1, "reading"),
    (1, "read"),
    (1, "want_to_read"),
    (2, "reading"),
    (2, "read"),
    (2, "want_to_read"),
    (3, "reading"),
    (3, "read"),
    (3, "want_to_read"),
    (4, "reading"),
    (4, "read"),
    (4, "want_to_read"),
    (5, "reading"),
    (5, "read"),
    (5, "want_to_read"),
    (6, "reading"),
    (6, "read"),
    (6, "want_to_read")
;

INSERT INTO Bookshelf_Books (id_bookshelf, ISBN) VALUES
    (1, 1111111111),
    (2, 1111111111),
    (1, 2222222222),
    (3, 3333333333),
    (1, 4444444444),
    (6, 5555555555),
    (9, 1111111111)
;

INSERT INTO Authors (id, name) VALUES
    (1, "Terrence Tao"),
    (2, "Brett Wortmanz"),
    (3, "Foo Bar the Third"),
    (4, "Suzzy Collins"),
    (5, "Albert Einstein"),
    (6, "李涛"),                           /* Testing non-latin characters */
    (7, "Александр Сергеевич Пушкин")      /* Testing non-latin characters */
;

INSERT INTO Genres (name) VALUES
    ("Horror"),
    ("Romance"),
    ("Action"),
    ("Young Adult"),
    ("Thriller")
;

INSERT INTO Book_Authors (ISBN_book, id_author) VALUES
    (1111111111, 1),
    (2222222222, 2),
    (3333333333, 3),
    (4444444444, 3), /* Edge Case */
    (5555555555, 4), /* Edge Case */
    (5555555555, 3)  /* Edge Case */
;

INSERT INTO Book_Genres (ISBN_book, id_genre) VALUES
    (1111111111, 1),
    (2222222222, 2),
    (3333333333, 3),
    (4444444444, 3), /* Edge Case */
    (5555555555, 5), /* Edge Case */
    (5555555555, 4)  /* Edge Case */
;

/* RUN DELETE STATEMENTS SEPARATELY IF DOING TESTING */
/* Testing Code For Deletion (Cascade test) */
/* Should delete the user in table User and its affiliated bookshelf and books */
-- DELETE FROM Users WHERE username = "frank";
-- DELETE FROM Users WHERE username = "elliot";

/* Remove book from specific user from shelf */
-- DELETE FROM Bookshelf_Books WHERE id_bookshelf = 1 AND ISBN = 1111111111;