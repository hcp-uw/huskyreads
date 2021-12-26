/**
 * DO NOT RUN THIS CODE IN SQL WITHOUT REPLACING THE PARAMETERS
**/

/* Code marked in [] indicates use of parameters */

/* Login Endpoint */
/* Parameters: Username, Password */
/* If empty, then login failed, otherwise login success + output color scheme*/
SELECT Users.color_scheme AS color_scheme
FROM Users
WHERE Users.username = [Username]
AND Users.password = [Password]
;


/* Create new user */
/* Parameters: Username, Password */
/* Try-Catch this since username needs to be unique! (User.username is a unique field) */
INSERT INTO Users (username, password) VALUES ([Username], [Password]);


/* Updates User Color Schema */
/* Parameters: Username, ColorScheme */
UPDATE Users
SET color_scheme = [ColorScheme]
WHERE username = [Username]
;


/* Accessing User Bookshelves */
/* Valid Bookshelf Names: "reading", "read", "want_to_read" */
/* Parameters: Username, BookshelfName */
SELECT id   /* We want use this in the Shelves query */
FROM Users
WHERE Users.username = [Username]
;
CREATE TEMPORARY TABLE Shelves
    SELECT Bookshelf.ISBN AS ISBN, Bookshelf.shelf_name AS name
    FROM Bookshelf
    INNER JOIN Users
        ON Users.id = Bookshelf.id_user
    WHERE Bookshelf.shelf_name = [BookshelfName] AND Users.id = [id]
;
CREATE TEMPORARY TABLE Book_Data
	SELECT Shelves.name AS shelfname, Books.title AS title, Books.ISBN AS ISBN
  	FROM Books
  	RIGHT JOIN Shelves
      	ON Shelves.ISBN = Books.ISBN
;
SELECT Book_Data.shelfname, Book_Data.title, Book_Data.ISBN,
    GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors,
    GROUP_CONCAT(DISTINCT Genres.name SEPARATOR ',') AS genres
FROM Book_Data
INNER JOIN Book_Authors
    ON Book_Data.ISBN = Book_Authors.ISBN
INNER JOIN Book_Genres
    ON Book_Data.ISBN = Book_Genres.ISBN
INNER JOIN Authors
    ON Book_Authors.id_author = Authors.id
INNER JOIN Genres
    ON Book_Genres.id_genre = Genres.id
GROUP BY Book_Data.shelfname, Book_Data.title, Book_Data.ISBN
;


/* Add Book to Bookshelf */
/* Parameters: Username, Bookshelf, ISBN */
SELECT id
FROM Users
WHERE Users.username = [Username]
;
INSERT INTO Bookshelf VALUES ([id], [ISBN], [Bookshelf]);


/* Remove Book from Bookshelf */
/* Parameters: Username, Bookshelf, ISBN */
SELECT id
FROM Users
WHERE Users.username = [Username]
;
DELETE FROM Bookshelf
WHERE id_user = [id]
AND ISBN = [ISBN]
AND shelf_name = [Bookshelf]
;


/* Retrieving Book Data */
/* Parameters: Title, Author, Genre ARR, Offset, ResultLength */
CREATE TEMPORARY TABLE Results
    SELECT Books.title AS title, Authors.name AS author_name
    FROM Books
    INNER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Book_Genres
        ON Books.ISBN = Book_Genres.ISBN
    INNER JOIN Genres
        ON Book_Genres.id_genre = Genres.id
    WHERE Books.title = [Title]
    AND Genres.name = [Genres] /* If multiple genres in array: use OR statements */
    ;
SELECT Results.title, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors
FROM Results
GROUP BY Results.title
HAVING FIND_IN_SET([Author], authors)
LIMIT [ResultLength] /* Default value 10 */
OFFSET [Offset]
;


/* Get Detailed Information for Single Book */
/* Parameter: ISBN */
CREATE TEMPORARY TABLE Results
    SELECT Books.title AS title, Books.date_published AS date_published,
        Authors.name AS author_name, Genres.name AS genre_name
    FROM Books
    INNER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Book_Genres
        ON Books.ISBN = Book_Genres.ISBN
    INNER JOIN Genres
        ON Book_Genres.id_genre = Genres.id
    WHERE Books.ISBN = [ISBN]
    ;
SELECT Results.title, Results.date_published,
    GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors,
    GROUP_CONCAT(DISTINCT Results.genre_name SEPARATOR ',') AS genres
FROM Results
GROUP BY Results.title, Results.date_published
;