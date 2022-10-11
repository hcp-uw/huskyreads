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
  date_published varchar(100)
);

CREATE TABLE Reviews (
  id_review int PRIMARY KEY AUTO_INCREMENT,
  ISBN_book char(13) NOT NULL REFERENCES Books(ISBN),
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
  id varchar(40) PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE Genres (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL
);

CREATE TABLE Book_Authors (
  ISBN_book char(13) NOT NULL,
  id_author varchar(40) REFERENCES Authors(id),
  /* Constraint: If a book is deleted, also delete book's related authors */
  CONSTRAINT REFBOOK
  FOREIGN KEY (ISBN_book)
  REFERENCES Books(ISBN)
    ON DELETE CASCADE
);

CREATE TABLE Book_Genres (
  ISBN_book char(13) NOT NULL,
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
INSERT INTO Books (ISBN, title, description, date_published) VALUES
    ('0123456789', "title0", "Long Description0", '2020-11-1'),
    ('1111111111', "title1", "Long Description1", '2020-12-1'),
    ('2222222222', "title2", "Long Description2", '2020-12-2'),
    ('3333333333', "title3", "Long Description3", '2020-12-3'),
    ('4444444444', "title4", "Long Description4", '2020-12-4'),
    ('5555555555', "title5", "Long Description5", '2020-12-5'),
    ('6666666666', "title6", "Long Description6", '2020-12-6'),
    ('1111111111111', "title11", "Long Description11", '2020-11-11'),
    ('7777777777777', "title7", "Long Description7", '2020-12-7'),
    ('0888888888888', "title8", "Long Description8", '2020-12-8')
;

INSERT INTO Authors (id, name) VALUES
    (1, "Terrence Tao"),
    (2, "Brett Wortmanz"),
    (3, "Foo Bar the Third"),
    (4, "Suzzy Collins"),
    (5, "Albert Einstein"),
    (6, "李涛"),                           /* Testing non-latin characters */
    (7, "Александр Сергеевич Пушкин"),    /* Testing non-latin characters */
    (8, "John Snow")
;

INSERT INTO Genres (name) VALUES
    ("Horror"),
    ("Romance"),
    ("Action"),
    ("Young Adult"),
    ("Thriller"),
    ("Fake Genre")
;

INSERT INTO Book_Authors (ISBN_book, id_author) VALUES
    ('1111111111', 1),
    ('2222222222', 2),
    ('3333333333', 3),
    ('4444444444', 3), /* Edge Case */
    ('5555555555', 4), /* Edge Case */
    ('5555555555', 3),  /* Edge Case */
    ('0123456789', 8),
    ('1111111111111', 8),
    ('7777777777777', 8),
    ('0888888888888', 8)
;

INSERT INTO Book_Genres (ISBN_book, id_genre) VALUES
    ('1111111111', 1),
    ('2222222222', 2),
    ('3333333333', 3),
    ('4444444444', 3), /* Edge Case */
    ('5555555555', 5), /* Edge Case */
    ('5555555555', 4), /* Edge Case */
    ('0123456789', 6),
    ('1111111111111', 6),
    ('7777777777777', 6),
    ('0888888888888', 6)

;

/* RUN DELETE STATEMENTS SEPARATELY IF DOING TESTING */
/* Testing Code For Deletion (Cascade test) */
/* Should delete the user in table User and its affiliated bookshelf and books */
-- DELETE FROM Users WHERE username = "frank";
-- DELETE FROM Users WHERE username = "elliot";

/* Remove book from specific user from shelf */
-- DELETE FROM Bookshelf_Books WHERE id_bookshelf = 1 AND ISBN = 1111111111;