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

/* RUN DELETE STATEMENTS SEPARATELY IF DOING TESTING */
/* Testing Code For Deletion (Cascade test) */
/* Should delete the user in table User and its affiliated bookshelf and books */
-- DELETE FROM Users WHERE username = "frank";
-- DELETE FROM Users WHERE username = "elliot";

/* Remove book from specific user from shelf */
-- DELETE FROM Bookshelf_Books WHERE id_bookshelf = 1 AND ISBN = 1111111111;