/**
 * DO NOT RUN THIS CODE IN SQL WITHOUT REPLACING THE PARAMETERS
**/

/* Code marked in [] indicates use of parameters */

-- TESTED SUCCESSFULLY
/* Login Endpoint */
/* Parameters: Username, Password */
/* If empty, then login failed, otherwise login success + output color scheme*/
SELECT User.color_scheme AS color_scheme
FROM User
WHERE User.username = [username]
AND User.password = [password]
;


-- TESTED SUCCESSFULLY
/* Create new user */
/* Parameters: Username, Password */
/* Try-Catch this since username needs to be unique! (User.username is a unique field) */
INSERT INTO User (username, password) VALUES (username [username], password [password]);


-- TESTED SUCCESSFULLY
/* Updates User Color Schema */
/* Parameters: Username, ColorScheme */
UPDATE User
SET color_scheme = [ColorScheme]
WHERE username = [Username]
;


-- TESTED SUCCESSFULLY
/* Accessing User Bookshelves */
/* Valid Bookshelf Names: "reading", "read", "want_to_read" */
/* Parameters: username, bookshelfName */
SELECT id   /* We want use this in the Shelves query */
FROM User
WHERE User.username = [username]
;
CREATE TEMPORARY TABLE Shelves
    SELECT Bookshelf.ISBN AS ISBN, Bookshelf.shelf_name AS name
    FROM Bookshelf
    INNER JOIN User
        ON User.id = Bookshelf.id_user
    WHERE Bookshelf.shelf_name = [bookshelfName] AND User.id = [id]
;
CREATE TEMPORARY TABLE Book_Data
	  SELECT Shelves.name AS shelfname, Books.title AS title, Books.ISBN AS ISBN
  	FROM Books
  	RIGHT JOIN Shelves
      	ON Shelves.ISBN = Books.ISBN
;
SELECT Book_Data.shelfname, Book_Data.title, Book_Data.ISBN, GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Genre.name SEPARATOR ',') AS genres
FROM Book_Data
INNER JOIN Book_Authors
    ON Book_Data.ISBN = Book_Authors.ISBN
INNER JOIN Book_Genre
    ON Book_Data.ISBN = Book_Genre.ISBN
INNER JOIN Authors
    ON Book_Authors.id_author = Authors.id
INNER JOIN Genre
    ON Book_Genre.id_genre = Genre.id
GROUP BY Book_Data.shelfname, Book_Data.title, Book_Data.ISBN
;


-- TESTED SUCCESSFULLY
/* Add Book to Bookshelf */
/* Parameters: username, bookshelf, isbn */
SELECT id
FROM User
WHERE User.username = [username]
;
INSERT INTO Bookshelf VALUES ([id], [isbn], [bookshelf]);


-- TESTED SUCCESSFULLY
/* Remove Book from Bookshelf */
/* Parameters: username, bookshelf, isbn */
SELECT id
FROM User
WHERE User.username = [username]
;
DELETE FROM Bookshelf
WHERE id_user = [id]
AND isbn = [isbn]
AND shelf_name = [bookshelf]
;


-- TESTED SUCCESSFULLY
/* Retrieving Book Data */
/* Parameters: title, author, genre ARR, offset, resultLength */
CREATE TEMPORARY TABLE Results
    SELECT Books.title AS title, Authors.name AS author_name
    FROM Books
    INNER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Book_Genre
        ON Books.ISBN = Book_Genre.ISBN
    INNER JOIN Genre
        ON Book_Genre.id_genre = Genre.id
    WHERE Books.title = [title]
    AND Genre.name = [genre] /* If multiple genres in array: use OR statements */
    ;
SELECT Results.title, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors
FROM Results
GROUP BY Results.title
HAVING FIND_IN_SET([author], authors)
LIMIT [resultLength] /* Default value 10 */
OFFSET [offset]
;


-- TESTED SUCCESSFULLY
/* Get Detailed Information for Single Book */
/* Parameter: ISBN */
CREATE TEMPORARY TABLE Results
    SELECT Books.title AS title, Books.date_published AS date_published, Authors.name AS author_name, Genre.name AS genre_name
    FROM Books
    INNER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Book_Genre
        ON Books.ISBN = Book_Genre.ISBN
    INNER JOIN Genre
        ON Book_Genre.id_genre = Genre.id
    WHERE Books.ISBN = [ISBN]
    ;
SELECT Results.title, Results.date_published, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Results.genre_name SEPARATOR ',') AS genres
FROM Results
GROUP BY Results.title, Results.date_published
;