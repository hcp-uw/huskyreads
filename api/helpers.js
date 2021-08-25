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

/* ------------------  MISC FUNCTIONS  ----------------- */
/**
 * Creates new User based on info
 * @param {String[]} info
 */
 async function createUser(info) {
	let query = "INSERT INTO User (username, password) VALUES (?, ?);";
	await db.query(query, info);
}

/**
 * Updates the User's current Color Scheme.
 * @param {String[]} info
 */
async function updateColorScheme(info) {
	let query = "UPDATE User SET color_scheme = ? WHERE username = ?";
	await db.query(query, info);
}

/* -----------------  CHECK FUNCTIONS  ----------------- */
/**
 * Checks if username exists
 * @param {String} username
 * @returns {boolean} true if username already exists
 */
async function checkIfUsernameExists(username) {
	let query = "SELECT * FROM User WHERE username = ?;";
	let [rows] = await db.query(query, [username]);
	return (rows.length >= 1);
}

/**
 * Checks if the given color scheme exists.
 * @param {String} color_scheme
 * @returns {boolean} true if the given color scheme exists
 */
async function checkColor(color_scheme) {
	let query = "SELECT * FROM User WHERE username = ? AND color_scheme = ?";
	let [rows] = await db.query(query, info);
	return (rows.length >= 1);
}

/**
 * @param {int} isbn Book ISBN number
 * @returns {boolean} True if a book exists with the given isbn, false otherwise
 * check if the book w/ the given isbn exists in our database
 */
 async function checkIfISBNExists(isbn) {
    let query = "SELECT COUNT(*) AS count FROM Books WHERE Books.isbn = ?";
    let [count] = await db.query(query, isbn);
    return count[0].count > 0;
}

/* ------------------  GET FUNCTIONS  ------------------ */
/**
 * Gets password from username
 * @param {String} username
 * @returns info of username
 */
async function getPassword(username) {
	let query = "SELECT * FROM User WHERE username=?;";
	let [rows] = await db.query(query, [username]);
	return rows;
}

/**
 * Gets the book from the specified bookshelf
 * @param {String[]} info
 * @returns the Bookshelf information of the user.
 */
async function getBook(info) {
    // Need to fix this query
    if (info[1] === "all") {
        // do something meaningful with "all" parameter here
    }
    // need to update query
	let query = "SELECT * FROM User WHERE username = ?;"; // Unsure how to address the other parts of the query.
	let [rows] = await db.query(query, info);
	return rows;
}

/**
 * Gets all of the books that match the given search query. Each book returned
 * will include its title, author(s) and isbn number.
 * @param {Object} info Search parameters provided by user
 * @returns {Object[]} List of books that satify the search query
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
 * @param {int} isbn Book ISBN number
 * @returns {JSON} json object containing the necessary book information (determined by API)
 */
 async function getBookDetails(isbn) {
    let query = `
    DROP TEMPORARY TABLE IF EXISTS Results;
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
    WHERE Books.ISBN = ?
    ;
    SELECT Results.title, Results.date_published, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Results.genre_name SEPARATOR ',') AS genres
    FROM Results
    GROUP BY Results.title, Results.date_published
    ;
    `
    let [results] = await db.query(query, isbn);
    return results[2];
}

// Exporting functions for use
module.exports = {createUser, updateColorScheme, checkIfUsernameExists, checkColor, checkIfISBNExists, getPassword, getBook, getMatchingBooks, getBookDetails};
