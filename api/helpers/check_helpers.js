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
 * Checks if the given username already exists
 * @param {String} username - The given username 
 * @returns {boolean} - True if the given username already exists
 */
async function checkIfUsernameExists(username) {
	let query = "SELECT * FROM User WHERE username = ?;";
	let [rows] = await db.query(query, [username]);
	return (rows.length >= 1);
}

/**
 * Check if the given isbn corresponds to a book in the database
 * @param {int} isbn - The given book's isbn
 * @returns {boolean} - True if a book has the corresponding isbn
 */
 async function checkIfIsbnExists(isbn) {
    let query = "SELECT COUNT(*) AS count FROM Books WHERE Books.isbn = ?";
    let [count] = await db.query(query, isbn);
    return count[0].count > 0;
}

/**
 * Checks if the given Bookshelf name exists within the database
 * @param {String[]} shelfInfo- The userID of the user, and the Bookshelf being checked
 * @returns {boolean} - True if the bookshelf name exists 
 */
async function checkIfVaildBookshelf(shelfInfo) {
	if (shelfInfo[1] == "all") {
		return true;
	}

    let query = "SELECT shelf_name FROM Bookshelf_Names WHERE shelf_name = ?";
	let [res] = await db.query(query, shelfInfo[1]);
	return res.length > 0;
}

/**
 * Checks if the given book exists in the users given bookshelf.
 * @param {String} bookshelf - The given bookshelf
 * @param {int} userID - The user's associated ID
 * @param {int} isbn - The given isbn 
 * @return {boolean} - True if the book is already in the bookshelf
 */
async function checkIfBookExistsInBookshelf(bookshelf, userID, isbn) {
    let query = "SELECT * FROM Bookshelf WHERE id_user = ? AND shelf_name = ? AND isbn = ?";
    let [rows] = await db.query(query, [userID, bookshelf, isbn]);
    return rows.length > 0;

module.exports = {checkIfUsernameExists, checkIfIsbnExists, checkIfVaildBookshelf, checkIfBookExistsInBookshelf}; 

