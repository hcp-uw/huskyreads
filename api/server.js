/**
 * Server-side API code for HuskyReads Project
 */
"use strict";

const express = require("express"); //npm install express
const fs = require('fs').promises; //npm install fs
const mysql = require("mysql2/promise"); //npm install mysql2
const multer = require("multer"); //npm install multer
const bcrypt = require("bcrypt"); //npm install bcrypt
const cors = require("cors"); //npm install cors

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

// Note: Use the logging module for all error codes
const SUCCESS_CODE = 200;			// Success
const CLIENT_ERROR_CODE_400 = 400;  // Bad Request
const CLIENT_ERROR_CODE_401 = 401;  // Unauthorized Access
const SERVER_ERROR_CODE = 500;      // Server Error format: "An error has occured on the server!"
const SERVER_ERROR_MESSAGE = "An error has occured on the server"
const LOCAL_HOST = 8000;
const DB_NAME = "huskyreads"; // Database name

const db = mysql.createPool({
	host: process.env.DB_URL || 'localhost',
	port: process.env.DB_PORT || '3306',
	user: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_NAME || DB_NAME,
	multipleStatements: true
});

/* --------------------  ENDPOINTS  -------------------- */

/*
 * Endpoint List:
 * Login                                  POST; PARAMS: Username, Password        /login
 * Create New User                        POST; PARAMS: Username, Password        /signup
 * Update User Color Scheme               POST; PARAMS: Username, Color_Scheme    /color_scheme
 * Accessing User Bookshelf               GET;  PARAMS: Username, Bookshelf       /bookshelves/get/:username/:bookshelf
 * Add book to bookshelf                  POST; PARAMS: Username, Bookshelf, ISBN /bookshelves/add
 * Remove book from bookshelf             POST; PARAMS: Username, Bookshelf, ISBN /bookshelves/remove
 * List of basic book data                GET;  PARAMS: Title, Author, Genre, Offset, ResultLength
 * Detailed information for single book   GET;  PARAMS: ISBN
 */

/**
 * Login endpoint
 */
app.post("/login", async (req, res) => {
	try {
		res.type("text");
		let username = req.body.username;
		let password = req.body.password;
		if (!username || !password) {
			res.status(CLIENT_ERROR_CODE_400).send("Missing username or password");
		} else {
			let returns = await getPassword(username);
			if (returns.length >= 1 && password === returns[0]["password"]) {
				res.status(SUCCESS_CODE).send("Login Successful");
			} else {
				res.status(CLIENT_ERROR_CODE_401).send("Invalid user credentials");
			}
		}
	} catch (err) {
		loggingModule(err, "login");
		res.status(SERVER_ERROR_CODE).send(SERVER_ERROR_MESSAGE);
	}
});

/**
 * Sign up endpoint (Create new User)
 */
app.post("/signup", async (req, res) => {
	try {
		res.type("text");
		let username = req.body.username;
		let password = req.body.password;
		if (!username || !password) {
			res.status(CLIENT_ERROR_CODE_400).send("Missing username or password");
		} else if (await checkIfExist(username)) {
			res.status(CLIENT_ERROR_CODE_400).send("Username already taken");
		} else {
			let info = [username, password];
			await createUser(info);
			res.status(SUCCESS_CODE).send("Signup Successful");
		}
	} catch (err) {
		loggingModule(err, "signup");
		res.status(SERVER_ERROR_CODE).send(SERVER_ERROR_MESSAGE);
	}
});

/**
 * Update user color scheme
 */
app.post("/color_scheme", async (req, res) => {
	try {
		res.type("text");
		let username = req.body.username;
		let color_scheme = req.body.color_scheme;
		if (!username || !color_scheme) {
			res.status(CLIENT_ERROR_CODE_400).send("Missing username or color_scheme");
		} else if (await !checkIfExist(usernamme)) {
			res.status(CLIENT_ERROR_CODE_401).send("Invalid Username");
		} else {
			let info = [username, color_scheme];
			if (!checkColor(color_scheme)) {
				res.status(CLIENT_ERROR_CODE_400).send("Invalid Color Scheme");
			} else {
				await updateColorScheme(info);
				res.status(SUCCESS_CODE).send(SERVER_ERROR_MESSAGE);
			}
		}
	} catch (err) {
		loggingModule(err, "color_scheme");
		res.status(SERVER_ERROR_CODE).send(SERVER_ERROR_MESSAGE);
	}
});


/**
 * Get user's book in bookshelf, with default value "all" for bookshelf name
 */
app.get("/bookshelves/get/:username/:bookshelf", async function(req, res) {
	try {
		res.type("JSON");
		let username = req.body.username;
		let bookshelf = req.body.bookshelf;
		if (!username) {
			res.status(CLIENT_ERROR_CODE_400).send("Missing username paramter");
		} else if (await !checkIfExist(username)) {
			res.status(CLIENT_ERROR_CODE_401).send("Invalid Username Parameter"); // Possibly change the error msg to something more clear?
		} else {
			if (!bookshelf) {
				bookshelf = "all";
			}

			let info = [username, bookshelf];
			let result = await getBook(info);
			if (!result) {
				res.status(CLIENT_ERROR_CODE_400).send("Invaild bookshelf name");
			}

			res.status(SUCCESS_CODE).send(result);
		}
	} catch (err) {
		loggingModule(err, "bookshelfGet");
		res.status(SERVER_ERROR_CODE).send(SERVER_ERROR_MESSAGE);
	}			
});

/**
 * Add book to bookshelf
 * (Check for duplicates within specific bookshelf)
 * (Do not need to check for overall duplicates? I assume?)
 */
app.post("/bookshelves/add", async (req, res) => {
	try {

	} catch (err) {
		loggingModule(err, "bookshelfAdd");
	}
});

/**
 * Remove book from bookshelf
 */
app.post("/bookshelves/remove", async (req, res) => {
	try {
		
	} catch (err) {
		loggingModule(err, "bookshelfRemove");
	}
});

/**
 * Get books with given search parameters
 * Note: All parameters are optional (Should we require at least 1 parameter?)
 * If no books match search criteria... return an empty JSON Object
 */
app.get("/books/search", async function(req, res) {
	try {
		res.type("json");
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let resultLength = req.query.resultLength ? parseInt(req.query.resultLength) : 10;
		let books = await getMatchingBooks(req.query);
		res.status(SUCCESS_CODE).json({
			remainingBooksInSearch : books.slice(offset + resultLength).length,
			books : books.slice(offset, offset + resultLength)
		});
	} catch (err) {
		loggingModule(err, "bookSearch");
		res.status(SERVER_ERROR_CODE).json({ err : SERVER_ERROR_MESSAGE });
	}
});

/**
 * Gets detailed information for book based on ISBN
 */
app.get("/books/detail/:isbn", async function(req, res) {
    try {
		res.type("JSON");
        let isbn = req.params.isbn;
        if (!isbn) {
            res.status(CLIENT_ERROR_CODE_400).json({"error": "Missing ISBN Parameter"});
        }
        let exists = await checkIfISBNExists(isbn);
        if (exists) {
            res.status(CLIENT_ERROR_CODE_400).json({"error": "Invalid ISBN"});
        }
        let results = await getBookDetails(isbn);
        res.json(results);
	} catch (err) {
		loggingModule(err, "bookDetail");
		res.status(SERVER_ERROR_CODE).json({ err : SERVER_ERROR_MESSAGE });
	}
});

/* -----------------  HELPER FUNCTIONS  ---------------- */

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

/**
 * @param {int} isbn Book ISBN number
 * @returns {JSON} json object containing the necessary book information (determined by API)
 */
async function getBookDetails(isbn) {
    let query =
    `
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
	let query = "SELECT * FROM User WHERE username = ?;"; // Unsure how to address the other parts of the query.
	let [rows] = await db.query(query, [username]);
	return rows;
}

/**
 * Checks if username exists
 * @param {String} username
 * @returns {boolean} true if username already exists
 */
async function checkIfExist(username) {
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
 * Gets all of the books that match the given search query. Each book returned
 * will include its title, author(s) and isbn number.
 *
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


/* ------------------  LOGGING MODULE  ----------------- */
/**
 * TESTED
 * Logging module for any error that occurs in an endpoint - Writes error to a new file
 * File name sample format: "2021-08-01_login"
 * @param {Error} errMsg Error message outputted by the issue caused in endpoint
 * @param {String} endpoint Name of the endpoint
 * NOTE: IF PROBLEM OCCURS WHILE LOGGING, ERROR MESSAGE WILL BE PRINTED TO CONSOLE
 */
async function loggingModule (errMsg, endpoint) {
	let datetime = new Date();
	let fileName = "logs/" + datetime.toISOString().substring(0, 10) + "_" + endpoint + ".txt";
    console.log(errMsg); // for individual testing
	await fs.writeFile(fileName,"\n" + errMsg, {flag: "a+"}, function (err) {
		if (err) {
            console.log(err);
        }
	});
}


/* -------------------  Public Port  ------------------- */
app.use(express.static("public"));
const PORT = process.env.PORT || LOCAL_HOST;
app.listen(PORT);
