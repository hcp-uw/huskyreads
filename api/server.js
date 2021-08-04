/**
 * Server-side API code for HuskyReads Project
 */
"use strict";

const express = require("express"); //npm install express
const fs = require('fs').promises; //npm install fs
const mysql = require("mysql2/promise"); //npm install mysql2
const multer = require("multer"); //npm install multer
const util = require("util"); //npm install util
const glob = require("glob"); //npm install glob
const globPromise = util.promisify(glob);
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
	port: process.env.DB_PORT || '8889',
	user: process.env.DB_USERNAME || 'admin',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_NAME || DB_NAME
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
		// console.log(err);
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
			createUser(info);
			res.status(SUCCESS_CODE).send("Signup Successful");
		}
	} catch (err) {
		loggingModule(err, "signup");
        // console.log(err);
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
		if (!username || !password) {
			res.status(CLIENT_ERROR_CODE_400).send("Missing username or color_scheme");
		} else {
			const db = await getDBConnection();
			await db.close();
		}
	} catch (err) {
		loggingModule(err, "color_scheme");
	}
});

/**
 * Get user's book in bookshelf, with default value "all" for bookshelf name
 */
app.get("/bookshelves/get/:username/:bookshelf", async function(req, res) {
	try {
		res.type("JSON");
		let username = req.body.username;
		let bookshelf = req.body.bookshelf
		if (!username) {
			res.status(CLIENT_ERROR_CODE_400).send("Missing username paramter");
		} else {
			const db = await getDBConnection();
			await db.close();
		}
	} catch (err) {
		loggingModule(err, "bookshelfGet");
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
app.get("/books/search/:title/:author/:genre/:offset/:resultLength", async function(req, res) {
	try {
		
	} catch (err) {
		loggingModule(err, "bookSearch");
	}
});

/**
 * Gets detailed information for book based on ISBN
 */
app.get("/books/detail/:isbn", async function(req, res) {
	try {
		
	} catch (err) {
		loggingModule(err, "bookDetail");
	}
});

/* -----------------  HELPER FUNCTIONS  ---------------- */
// async function getDBConnection() {
// 	const db = mysql.createPool({
// 		host: process.env.DB_URL || 'localhost',
// 		port: process.env.DB_PORT || '8889',
// 		user: process.env.DB_USERNAME || 'admin',
// 		password: process.env.DB_PASSWORD || 'root',
// 		database: process.env.DB_NAME || DB_NAME
// 	});

// 	return db;
// }

/**
 * Creates new User based on info
 * @param {String[]} info
 */
 async function createUser(info) {
	let query = "INSERT INTO User (username, password) VALUES (?, ?);";
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
 * Checks if username exists
 * @param {String} username
 * @returns {boolean} true if username aleady exists
 */
async function checkIfExist(username) {
	let query = "SELECT * FROM User WHERE username = ?;";
	let [rows] = await db.query(query, [username]);
	return (rows.length >= 1);
}


/* ------------------  LOGGING MODULE  ----------------- */
/**
 * Logging module for any error that occurs in an endpoint - Writes error to a new file
 * File name sample format: "2021-08-01T20:36:31.346Z_login"
 * @param {Error} errMsg Error message outputted by the issue caused in endpoint
 * @param {String} endpoint Name of the endpoint
 * NOTE: NOT YET TESTED (just write an endpoint and call this function)
 * NOTE: IF PROBLEM OCCURS WHILE LOGGING, ERROR MESSAGE WILL BE PRINTED TO CONSOLE
 */
async function loggingModule (errMsg, endpoint) {
	let datetime = new Date();
	let fileName = "/logs/" + datetime.toISOString() + "_" + endpoint + ".txt";
	await fs.writeFile(fileName, errMsg, function (err) {
		if (err) return console.log(err);
	});
}


/* -------------------  Public Port  ------------------- */
app.use(express.static("public"));
const PORT = process.env.PORT || LOCAL_HOST;
app.listen(PORT);
