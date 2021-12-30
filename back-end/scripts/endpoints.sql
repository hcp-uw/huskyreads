/**
 * DO NOT RUN THIS CODE IN SQL WITHOUT REPLACING THE PARAMETERS
**/

/* Code marked in [] indicates use of parameters */


-- TESTED
/* Login Endpoint */
/* Parameters: Username, Password */
/* If empty, then login failed, otherwise login success + output color scheme*/
SELECT Users.id AS id, Users.color_scheme AS color_scheme
FROM Users
WHERE Users.username = [Username]
AND Users.password = [Password]
;


-- TESTED
/* Create new user */
/* Parameters: Username, Password */
/* Try-Catch this since username needs to be unique! (User.username is a unique field) */
INSERT INTO Users(username, password) VALUES ([Username], [Password]);
SELECT LAST_INSERT_ID() AS userid;  /* Gets the user's ID after insert, for bookshelves */
INSERT INTO Bookshelves (userid, shelf_name) VALUES
    (id_user, "reading"),
    (id_user, "read"),
    (id_user, "want_to_read")
;


-- TESTED
/* Updates User Color Schema */
/* Parameters: Username, ColorScheme */
UPDATE Users
SET color_scheme = [ColorScheme]
WHERE username = [Username]
;


-- TESTED
/* Accessing User Bookshelves */
/* Valid Bookshelf Names (for now): "reading", "read", "want_to_read" */
/* Parameters: User_id, BookshelfName */
DROP TABLE IF EXISTS Shelves, Book_Data;     /* Clearing old temporary tables */
CREATE TEMPORARY TABLE Shelves
    SELECT Bookshelves.shelf_name AS shelfname, Bookshelf_Books.ISBN AS ISBN
    FROM Bookshelves
    INNER JOIN Bookshelf_Books
        ON Bookshelves.id = Bookshelf_Books.id_bookshelf
    WHERE Bookshelves.shelf_name = [BookshelfName]
    AND Bookshelves.id_user = [User_id]
;
CREATE TEMPORARY TABLE Book_Data
	SELECT Shelves.shelfname AS shelfname, Books.title AS title, Books.ISBN AS ISBN
  	FROM Books
  	INNER JOIN Shelves
      	ON Shelves.ISBN = Books.ISBN
;
SELECT Book_Data.shelfname, Book_Data.title, Book_Data.ISBN,
    GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors,
    GROUP_CONCAT(DISTINCT Genres.name SEPARATOR ',') AS genres
FROM Book_Data
INNER JOIN Book_Authors
    ON Book_Data.ISBN = Book_Authors.ISBN_book
INNER JOIN Book_Genres
    ON Book_Data.ISBN = Book_Genres.ISBN_book
INNER JOIN Authors
    ON Book_Authors.id_author = Authors.id
INNER JOIN Genres
    ON Book_Genres.id_genre = Genres.id
GROUP BY Book_Data.shelfname, Book_Data.title, Book_Data.ISBN
;


-- TESTED
/* Add Book to Bookshelf */
/* Parameters: User_id, Bookshelf, ISBN */
SELECT Bookshelves.id AS id_bookshelf
FROM Bookshelves
WHERE Bookshelves.id_user = [User_id]
AND Bookshelves.shelf_name = [Bookshelf]
;
INSERT INTO Bookshelf_Books VALUES (id_bookshelf, [ISBN]);


-- TESTED
/* Remove Book from Bookshelf */
/* Parameters: User_id, Bookshelf, ISBN */
SELECT Bookshelves.id AS bookshelf_id
FROM Bookshelves
WHERE Bookshelves.id_user = [User_id]
AND Bookshelves.shelf_name = [Bookshelf]
;
DELETE FROM Bookshelf_Books
WHERE Bookshelf_Books.id_bookshelf = bookshelf_id
AND Bookshelf_Books.ISBN = [ISBN]
;


-- TESTED
/* Retrieving Book Data */
/* Parameters: Title, Author, Genre ARR, Offset, ResultLength */
SELECT Books.title AS title,
    GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS author_names
FROM Books
INNER JOIN Book_Authors
    ON Books.ISBN = Book_Authors.ISBN_book
INNER JOIN Authors
    ON Book_Authors.id_author = Authors.id
INNER JOIN Book_Genres
    ON Books.ISBN = Book_Genres.ISBN_book
INNER JOIN Genres
    ON Book_Genres.id_genre = Genres.id
WHERE Books.title = [Title]
AND Genres.name = [Genre] -- If multiple genres, use OR statements
GROUP BY Books.title
HAVING FIND_IN_SET([Author], author_names)
LIMIT [ResultLength]
OFFSET [Offset]
;


-- TESTED
/* Get Detailed Information for Single Book */
/* Parameter: ISBN */
SELECT Books.title AS title, Books.date_published AS date_published,
    GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors,
    GROUP_CONCAT(DISTINCT Genres.name SEPARATOR ',') AS genres
FROM Books
INNER JOIN Book_Authors
    ON Books.ISBN = Book_Authors.ISBN_book
INNER JOIN Authors
    ON Book_Authors.id_author = Authors.id
INNER JOIN Book_Genres
    ON Books.ISBN = Book_Genres.ISBN_book
INNER JOIN Genres
    ON Book_Genres.id_genre = Genres.id
WHERE Books.ISBN = [ISBN]
GROUP BY Books.title, Books.date_published
;