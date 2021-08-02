/**
 * DO NOT RUN THIS CODE IN SQL, SINCE IT REQUIRES PARAMETERS WE WILL RUN IT IN THE NODE.JS FILE
**/

/* Login Endpoint */
/* username, password are given parameters */
/* If empty, then login failed, otherwise login success + output color scheme*/
SELECT User.color_scheme AS color_scheme
FROM User
WHERE User.username = username
AND User.password = password
;


/* Create new user */
/* username, password are given parameters */
/* Try-Catch this since username needs to be unique! (User.username is a unique field) */
INSERT INTO User (username, password) VALUES (username parameter, password parameter);


/* Accessing User Bookshelves */
/* Valid Bookshelf Names: "reading", "read", "want_to_read" */
/* Parameters: username, bookshelfName */
/* AHHHHHHHHHHH I DONT KNOW IF THIS WORKSSSS AHHHHHHHHHHHHHHH */
WITH Book AS (
  WITH Shelves AS (
  SELECT Bookshelf.ISBN AS ISBN, Bookshelf.shelf_name AS name
  FROM Bookshelf
  WHERE Bookshelf.shelf_name = bookshelfName
  INNER JOIN User ON User.id = Bookshelf.id_user
  )
  SELECT Shelves.name AS shelfname, Books.title AS title, Books.ISBN AS ISBN
  FROM Books, Shelves
  RIGHT JOIN Shelves
  ON Shelves.ISBN = Books.ISBN
)
SELECT Book.shelfname, Book.titile, Book.ISNB, Authors.author, Genre.name
INNER JOIN Books_Authors
ON Book.ISBN = Books_Authors.ISBN_book
INNER JOIN Book_Genre
ON Book.ISBN = Book_Genre.ISBN_book
INNER JOIN Authors
ON Books_Authors.id_author = Authors.id
INNER JOIN Genre
ON Book_Genre.id_genre = Genre.id
;

/* Add Book to Bookshelf */
/* Parameters: username, bookshelf, isbn */
SELECT id
FROM User
WHERE User.username = username
;
/* Gives the USER ID */
INSERT INTO Bookshelf VALUES (id, isbn, bookshelf);

/* Remove Book from Bookshelf */
/* Parameters: username, bookshelf, isbn */
SELECT id
FROM User
WHERE User.username = username
;
/* Gives the USER ID */
DELETE FROM Bookshelf
WHERE id_user = id
AND isbn = isbn
AND shelf_name = bookshelf
;


/* Retrieving Book Data */
/* Parameters: title, author, genre ARR, offset, resultLength */
/* I want to cry LMAO IDK IF THESE INNER JOINS ACTUALLY WORK PRAYGE */
SELECT Books.title, Author.author, Genre.name, COUNT(*) as remainingBooksInSearch
FROM Books
WHERE Books.title = title
AND Authors.author = author
AND (Genre.name = genre[0] OR Genre.name = genre[1]...)
INNER JOIN Books_Authors
ON Books.ISBN = Books_Authors.ISBN_book
INNER JOIN Authors
ON Books_Authors.id_author = Authors.id
INNER JOIN Book_Genre
ON Books.ISBN = Book_Genre.ISBN_book
INNER JOIN Genre
ON Book_Genre.ISBN_book = Genre.id
LIMIT resultLength DEFAULT 10
OFFSET offset
;


/* Get Detailed Information for Single Book */
/* Parameter: ISBN */
SELECT Books.title AS title, Book.description AS description, Book.date_published AS date_published, Authors.author, Genre.genre
FROM Books
INNER JOIN Books_Authors
ON Books.ISBN = Books_Authors.ISBN_book
INNER JOIN Authors
ON Books_Authors.id_author = Authors.id
INNER JOIN Book_Genre
ON Books.ISBN = Book_Genre.ISBN_book
INNER JOIN Genre
ON Book_Genre.ISBN_book = Genre.id
