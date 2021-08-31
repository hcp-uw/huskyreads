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

/**
 * Creates new User with a unique username, and a password
 * @param {String[]} userInfo - The new clients username and password
 */
 async function createUser(userInfo) {
	let query = "INSERT INTO User (username, password) VALUES (?, ?);";
	await db.query(query, userInfo);
}

/**
 * Updates the User's current color scheme.
 * @param {String[]} userInfo - The clients username and color_scheme
 */
async function updateColorScheme(userInfo) {
	let query = "UPDATE User SET color_scheme = ? WHERE username = ?";
	await db.query(query, userInfo);
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
 * @param {int} userID - The id for the given user
 * @param {String} bookshelf - The name of the bookshelf to alter
 * @param {int} isbn - The isbn of the book to remove
 * @return {boolean} - True if the table was altered, false otherwise
 */
 async function deleteBookshelfRecord(userID, bookshelf, isbn) {
    let query = "DELETE FROM Bookshelf WHERE id_user = ? AND isbn = ? AND shelf_name = ?;";
    let [rows] = await db.query(query, [userID, isbn, bookshelf])
    return rows.affectedRows > 0;
}

module.exports = {createUser, updateColorScheme, insertBook, deleteBookshelfRecord};
