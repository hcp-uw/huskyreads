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
  ISBN char(13) UNIQUE PRIMARY KEY,
  title varchar(255) NOT NULL,
  description TEXT,
  date_published date
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
    ISBN char(13) NOT NULL,
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
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Genres (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Book_Authors (
  ISBN_book char(13) NOT NULL,
  id_author int NOT NULL REFERENCES Authors(id),
  /* Constraint: If a book is deleted, also delete book's author connections */
  CONSTRAINT REFBOOK
  FOREIGN KEY (ISBN_book)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);

CREATE TABLE Book_Genres (
  ISBN_book char(13) NOT NULL,
  id_genre int NOT NULL REFERENCES Genres(id),
  /* Constraint: If a book is deleted, also delete the book's genre connections */
  FOREIGN KEY (ISBN_BOOK)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);


-- SELECT @@auto_increment_increment;
SET auto_increment_increment = 1;
-- SELECT @@auto_increment_offset;
SET auto_increment_offset = 1;


/* SAMPLE DATA */

INSERT INTO Books (ISBN, title, description, date_published) VALUES
    ('1111111111', "title1", "Long Description1", '2020-12-1'),
    ('2222222222', "title2", "Long Description2", '2020-12-2'),
    ('3333333333', "title3", "Long Description3", '2020-12-3'),
    ('4444444444', "title4", "Long Description4", '2020-12-4'),
    ('5555555555', "title5", "Long Description5", '2020-12-5'),
    ('6666666666', "title6", "Long Description6", '2020-12-6'),
;


INSERT INTO Authors (name) VALUES
    ("Terrence Tao"),
    ("Brett Wortmanz"),
    ("Foo Bar the Third"),
    ("Suzzy Collins"),
    ("Albert Einstein"),
    ("李涛"),                           /* Testing non-latin characters */
    ("Александр Сергеевич Пушкин")      /* Testing non-latin characters */
;

INSERT INTO Genres (name) VALUES
    ("Horror"),
    ("Romance"),
    ("Action"),
    ("Young Adult"),
    ("Thriller")
;

INSERT INTO Book_Authors (ISBN_book, id_author) VALUES
    ('1111111111', 1),
    ('2222222222', 2),
    ('3333333333', 3),
    ('4444444444', 3), /* Edge Case */
    ('5555555555', 4), /* Edge Case */
    ('5555555555', 3),  /* Edge Case */
;

INSERT INTO Book_Genres (ISBN_book, id_genre) VALUES
    ('1111111111', 1),
    ('2222222222', 2),
    ('3333333333', 3),
    ('4444444444', 3), /* Edge Case */
    ('5555555555', 5), /* Edge Case */
    ('5555555555', 4), /* Edge Case */
;

/* RUN DELETE STATEMENTS SEPARATELY IF DOING TESTING */
/* Testing Code For Deletion (Cascade test) */
/* Should delete the user in table User and its affiliated bookshelf and books */
-- DELETE FROM Users WHERE username = "frank";
-- DELETE FROM Users WHERE username = "elliot";

/* Remove book from specific user from shelf */
-- DELETE FROM Bookshelf_Books WHERE id_bookshelf = 1 AND ISBN = 1111111111;