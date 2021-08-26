/**
 * Server-side API code for HuskyReads Project
 */
"use strict";

const express = require("express"); //npm install express
const fs = require('fs').promises; //npm install fs
const multer = require("multer"); //npm install multer
const bcrypt = require("bcrypt"); //npm install bcrypt
const cors = require("cors"); //npm install cors
const helper = require("./helpers");  // adds helper methods from helpers.js

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
			let returns = await helper.getPassword(username);
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
		} else if (await helper.checkIfUsernameExists(username)) {
			res.status(CLIENT_ERROR_CODE_400).send("Username already taken");
		} else {
			let info = [username, password];
			await helper.createUser(info);
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
		} else if (await !helper.checkIfUsernameExists(username)) {
			res.status(CLIENT_ERROR_CODE_401).send("Invalid Username");
		} else {
			let info = [username, color_scheme];
			if (!helper.checkColor(color_scheme)) {
				res.status(CLIENT_ERROR_CODE_400).send("Invalid Color Scheme");
			} else {
				await helper.updateColorScheme(info);
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
		} else if (await !helper.checkIfUsernameExists(username)) {
			res.status(CLIENT_ERROR_CODE_401).send("Invalid Username Parameter"); // Possibly change the error msg to something more clear?
		} else {
			if (!bookshelf) {
				bookshelf = "all";
			}
			let info = [username, bookshelf];
			let result = await helper.getBookshelf(info);
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
		let books = await helper.getMatchingBooks(req.query);
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
        } else {
			let exists = await helper.checkIfISBNExists(isbn);
			if (!exists) {
				res.status(CLIENT_ERROR_CODE_400).json({"error": "Invalid ISBN"});
			} else {
				let results = await helper.getBookDetails(isbn);
				res.json(results);
			}
		}
	} catch (err) {
		loggingModule(err, "bookDetail");
		res.status(SERVER_ERROR_CODE).json({ err : SERVER_ERROR_MESSAGE });
	}
});

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
