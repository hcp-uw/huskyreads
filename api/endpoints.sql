/**
 * DO NOT RUN THIS CODE IN SQL, SINCE IT REQUIRES PARAMETERS WE WILL RUN IT IN THE NODE.JS FILE
**/

-- TESTED SUCCESSFULLY
/* Login Endpoint */
/* username, password are given parameters */
/* If empty, then login failed, otherwise login success + output color scheme*/
SELECT User.color_scheme AS color_scheme
FROM User
WHERE User.username = username
AND User.password = password
;


-- TESTED SUCCESSFULLY
/* Create new user */
/* username, password are given parameters */
/* Try-Catch this since username needs to be unique! (User.username is a unique field) */
INSERT INTO User (username, password) VALUES (username parameter, password parameter);


-- TESTED SUCCESSFULLY
/* Updates User Color Schema */
/* Parameters: Username, ColorScheme */
UPDATE User
SET color_scheme = ColorScheme
WHERE username = Username
;


/* Accessing User Bookshelves */
/* Valid Bookshelf Names: "reading", "read", "want_to_read" */
/* Parameters: username, bookshelfName */
/* AHHHHHHHHHHH I DONT KNOW IF THIS WORKSSSS AHHHHHHHHHHHHHHH */
SELECT id
FROM User
WHERE User.username = username

CREATE TEMPORARY TABLE Shelves
	SELECT User.id, Bookshelf.ISBN AS ISBN, Bookshelf.shelf_name AS name
  	FROM Bookshelf
  	INNER JOIN User 
    ON User.id = Bookshelf.id_user
    WHERE Bookshelf.shelf_name = 'reading' AND User.id = 1
 	;
SELECT Shelves.id AS user_id, Shelves.name AS shelfname, Books.title AS title, Books.ISBN AS ISBN
FROM Books
RIGHT JOIN Shelves
ON Shelves.ISBN = Books.ISBN
-- BELOW IS OLDER CODE
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


-- TESTED SUCCESSFULLY
/* Add Book to Bookshelf */
/* Parameters: username, bookshelf, isbn */
SELECT id
FROM User
WHERE User.username = username
;
INSERT INTO Bookshelf VALUES (id, isbn, bookshelf);


-- TESTED SUCCESSFULLY
/* Remove Book from Bookshelf */
/* Parameters: username, bookshelf, isbn */
SELECT id
FROM User
WHERE User.username = username
;
DELETE FROM Bookshelf
WHERE id_user = id
AND isbn = isbn
AND shelf_name = bookshelf
;

-- TESTED SUCCESSFULLY
/* Retrieving Book Data */
/* Parameters: title, author, genre ARR, offset, resultLength */
/* I want to cry LMAO IDK IF THESE INNER JOINS ACTUALLY WORK PRAYGE */
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
    WHERE Books.title = "title5"
    AND Authors.name = "Suzzy Collins"
    AND Genre.name = "Thriller"
    ;
SELECT Results.title, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ', ') AS authors
FROM Results
GROUP BY Results.title
LIMIT 10
OFFSET 0
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
    WHERE Books.ISBN = 5555555555
    ;
SELECT Results.title, Results.date_published, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ', ') AS authors, GROUP_CONCAT(DISTINCT Results.genre_name SEPARATOR ', ') AS genres
FROM Results
GROUP BY Results.title, Results.date_published
;