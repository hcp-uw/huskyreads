/**
 * Helper functions for server.js
 * Reference link: https://www.stanleyulili.com/node/node-modules-import-and-use-functions-from-another-file/
 */

"use strict"

const mysql = require("mysql2/promise"); //npm install mysql2
const DB_NAME = "huskyreads"; // Database name
const db = mysql.createPool({
	host: process.env.DB_URL || 'localhost',
	port: process.env.DB_PORT || '3306',
	user: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_NAME || DB_NAME,
	multipleStatements: true
});

/* ----------------------------  MISC FUNCTIONS  --------------------------- */
/**
 * Creates new User with a unique username, and a password
 * @param {String[]} info - The new clients username and password
 */
 async function createUser(info) {
	let query = "INSERT INTO User (username, password) VALUES (?, ?);";
	await db.query(query, info);
}

/**
 * Updates the User's current Color Scheme.
 * @param {String[]} info - The clients username and color_scheme
 */
async function updateColorScheme(info) {
	let query = "UPDATE User SET color_scheme = ? WHERE username = ?";
	await db.query(query, info);
}

/**
 * Adds a book to the specified bookshelf for a given user
 * @param {String} bookshelf - The name of the bookshelf to alter
 * @param {int} userID - The id for the given user
 * @param {int} isbn - The isbn of the book to add
 */
async function insertBook(bookshelf, userID, isbn) {
	let query = "INSERT INTO Bookshelf VALUES (?, ?, ?)";  
	await db.query(query, [userID, isbn, bookshelf])
}

/**
 * Removes a book from a specified bookshelf for a given user
 * @param {int} userId - The id for the given user
 * @param {String} bookshelf - The name of the bookshelf to alter
 * @param {int} isbn - The isbn of the book to remove
 * @return {boolean} True if the table was altered, false otherwise
 */
 async function deleteBookshelfRecord(userId, bookshelf, isbn) {
    let query = "DELETE FROM Bookshelf WHERE id_user = ? AND isbn = ? AND shelf_name = ?;";
    let [rows] = await db.query(query, [userId, isbn, bookshelf])
    return rows.affectedRows > 0;
}

/* ---------------------------  CHECK FUNCTIONS  --------------------------- */
/**
 * Checks if username already exists
 * @param {String} username - the given username 
 * @returns {boolean} True if the username already exists
 */
async function checkIfUsernameExists(username) {
	let query = "SELECT * FROM User WHERE username = ?;";
	let [rows] = await db.query(query, [username]);
	return (rows.length >= 1);
}

/**
 * Check if the given ISBN corresponds to a book in the database
 * @param {int} isbn - The given book ISBN
 * @returns {boolean} True if a book exists with the given isbn, false otherwise
 */
 async function checkIfISBNExists(isbn) {
    let query = "SELECT COUNT(*) AS count FROM Books WHERE Books.isbn = ?";
    let [count] = await db.query(query, isbn);
    return count[0].count > 0;
}

/**
 * Checks if the given Bookshelf name exists within the database
 * @param {String[]} info - The userID of the user, and the Bookshelf being 
 *                          checked
 * @returns {boolean} True if the bookshelf name exists 
 */
async function checkIfVaildBookshelf(info) {
	if (info[1] == "all") {
		return true;
	}

    let query = "SELECT shelf_name FROM Bookshelf_Names WHERE shelf_name = ?";
	let [res] = await db.query(query, info[1]);
	return res.length > 0;
}

/**
 * Checks if the given book already exists in the users given bookshelf.
 * @param {String} bookshelf - The given bookshelf
 * @param {int} userId - The user's associated ID
 * @param {int} isbn - The given ISBN 
 * @return {boolean} True if the book is already in the bookshelf
 */
async function checkIfBookExistsInBookshelf(bookshelf, userId, isbn) {
    let query = "SELECT * FROM Bookshelf WHERE id_user = ? AND shelf_name = ? AND ISBN = ?";
    let [rows] = await db.query(query, [userId, bookshelf, isbn]);
    return rows.length > 0;
}

/* ----------------------------  GET FUNCTIONS  ---------------------------- */

/**
 * Returns the id of the user with the given username or 0 if no user exists.
 * @param {String} username - The username of the user to get the id for.
 * @returns {int} The users id or 0 if no user exists with the username.
 */
 async function getUserId(username) {
    let query = "SELECT id FROM User WHERE User.username = ?;"
    let [rows] = await db.query(query, [username]);
    if (!rows[0]) {
        return 0;
    } else {
        return rows[0].id;
    }
}

/**
 * Gets password from username
 * @param {String} username - The username of the user to get the password for.
 * @returns info of username
 */
async function getPassword(username) {
	let query = "SELECT * FROM User WHERE username=?;";
	let [rows] = await db.query(query, [username]);
	return rows;
}

/**
 * Gets the book from the specified bookshelf
 * @param {String[]} info - stored in the format [userID, bookshelf]
 * @returns the Bookshelf information of the user.
 */
async function getBookshelf(info) {
    let bookshelves = [];
    let query = "";
    if (info[1] === "all") {
        // Purpose of this is to add all distinct bookshelf names into an array, so we can iterate over each bookshelf and get its corresponding books
        query = "SELECT DISTINCT shelf_name FROM Bookshelf WHERE id_user = ?";
        let [res] = await db.query(query, info[0]);  // could I just do let bookshelves = await db.query(query, userID)?
        for (let index = 0; index < res.length; index++) {
            bookshelves.push(res[index].shelf_name);
        }
    } else {
        bookshelves.push(info[1]);
    }
    // WILL DEFINITELY NEED TO MAKE THIS QUERY FASTER (SCALABILITY SINCE WE MIGHT NEED TO CALL THIS MULTIPLE TIMES)
	query =
    `
    DROP TEMPORARY TABLE IF EXISTS Shelves, Book_Data;
    CREATE TEMPORARY TABLE Shelves
        SELECT Bookshelf.ISBN AS ISBN, Bookshelf.shelf_name AS name
        FROM Bookshelf
        INNER JOIN User
            ON User.id = Bookshelf.id_user
        WHERE Bookshelf.shelf_name = ? AND User.id = ?
    ;
    CREATE TEMPORARY TABLE Book_Data
        SELECT Shelves.name AS shelfname, Books.title AS title, Books.ISBN AS ISBN
        FROM Books
        RIGHT JOIN Shelves
            ON Shelves.ISBN = Books.ISBN
    ;
    SELECT Book_Data.title, Book_Data.ISBN, GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Genre.name SEPARATOR ',') AS genres
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
    `
    let result = [];
    for (let bookshelfName of bookshelves) {
        let bookshelf = [];
        let [rows] = await db.query(query, [bookshelfName, info[0]]);
        let data = rows[3];
        for (let row of data) {
            let book = {
                "isbn": row.ISBN,
                "title": row.title,
                "authors": row.authors,
                "genres": row.genres
            };
            bookshelf.push(book);
        }
        result.push({"name": bookshelfName, "books": bookshelf});
    }

	return result;
}

/**
 * Gets all of the books that match the given search query. Each book returned
 * will include its title, author(s) and isbn number.
 * @param {Object} info - Search parameters provided by user
 * @returns {Object[]} List of books that satisfy the given search query
 */
async function getMatchingBooks(info) {
	let title = info.title;
	let author = info.author;
	let genre = info.genre;

	let params = [];
	let query = `   DROP TEMPORARY TABLE IF EXISTS Results; CREATE TEMPORARY TABLE Results
					SELECT Books.title AS title, Authors.name AS author_name, Books.ISBN AS isbn
					FROM Books
					INNER JOIN Book_Authors
						ON Books.ISBN = Book_Authors.ISBN
					INNER JOIN Authors
						ON Book_Authors.id_author = Authors.id
					INNER JOIN Book_Genre
						ON Books.ISBN = Book_Genre.ISBN
					INNER JOIN Genre
						ON Book_Genre.id_genre = Genre.id
					WHERE 1=1
				`;
	if (title) {
		query += " AND Books.title = ?";
		params.push(title);
	}
	if (genre) {
		query += " AND Genre.name IN ?";
		params.push([genre]);
	}
	query += `;
		SELECT Results.title, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors, Results.isbn
		FROM Results
		GROUP BY Results.title, Results.isbn
	`;
	if (author) {
		query += "HAVING FIND_IN_SET(?, authors)";
		params.push(author);
	}
	query += `;`;
	return [await db.query(query, params)][0][0][2];
}

/**
 * Fetches all the details of the given book
 * @param {int} isbn Book ISBN number
 * @returns {JSON} json object containing the necessary book information (determined by API)
 */
 async function getBookDetails(isbn) {
    let query = `
    DROP TEMPORARY TABLE IF EXISTS Results;
    CREATE TEMPORARY TABLE Results
    SELECT Books.title AS title, Books.date_published AS date_published, Books.description AS description, Authors.name AS author_name, Genre.name AS genre_name
    FROM Books
    INNER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Book_Genre
        ON Books.ISBN = Book_Genre.ISBN
    INNER JOIN Genre
        ON Book_Genre.id_genre = Genre.id
    WHERE Books.ISBN = ?
    ;
    SELECT Results.title, Results.date_published, Results.description, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Results.genre_name SEPARATOR ',') AS genres
    FROM Results
    GROUP BY Results.title, Results.date_published, Results.description
    ;
    `
    let [results] = await db.query(query, isbn);
    let data = results[2][0];
    data.authors = data.authors.split(",");
    data.genres = data.genres.split(",");
    return data;
}

// Exporting functions for use
module.exports = {createUser, updateColorScheme, insertBook, deleteBookshelfRecord, checkIfUsernameExists, checkIfISBNExists, checkIfVaildBookshelf, checkIfBookExistsInBookshelf, getUserId, getPassword, getBookshelf, getMatchingBooks, getBookDetails};
