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

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

// Note: Use the logging module for all error codes
const CLIENT_ERROR_CODE_400 = 400;
const CLIENT_ERROR_CODE_401 = 401;
const SERVER_ERROR_CODE = 500;      // Server Error format: "An error has occured on the server!"
const LOCAL_HOST = 8000;
const DB_NAME = ""; // Database name

/* --------------------  ENDPOINTS  -------------------- */

/*
 * Endpoint List:
 * Login                                  POST; PARAMS: Username, Password        /login
 * Create New User                        POST; PARAMS: Username, Password        /signup
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
    const db = await getDBConnection();
  } catch (err) {
    loggingModule(err, "login");
  }
});

/**
 * Sign up endpoint (Create new User)
 */
app.post("/signup", async (req, res) => {
  try {
    const db = await getDBConnection();
  } catch (err) {
    loggingModule(err, "signup");
  }
});

/**
 * Get user's book in bookshelf, with default value "all" for bookshelf name
 */
app.get("/bookshelves/get/:username/:bookshelf", async function(req, res) {
  try {
    const db = await getDBConnection();
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
    const db = await getDBConnection();
  } catch (err) {
    loggingModule(err, "bookshelfAdd");
  }
});

/**
 * Remove book from bookshelf
 */
app.post("/bookshelves/remove", async (req, res) => {
  try {
    const db = await getDBConnection();
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
    const db = await getDBConnection();
  } catch (err) {
    loggingModule(err, "bookSearch");
  }
});

/**
 * Gets detailed information for book based on ISBN
 */
app.get("/books/detail/:isbn", async function(req, res) {
  try {
    const db = await getDBConnection();
  } catch (err) {
    loggingModule(err, "bookDetail");
  }
});

/* -----------------  HELPER FUNCTIONS  ---------------- */
async function getDBConnection() {
  const db = mysql.createPool({
    host: process.env.DB_URL || 'localhost',
    port: process.env.DB_PORT || '8889',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || DB_NAME
  });
  return db;
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
function loggingModule (errMsg, endpoint) {
  let datetime = new Date();
  let fileName = "/logs/" + datetime.toISOString() + "_" + endpoint + ".txt";
  fs.writeFile(fileName, errMsg, {flag: "w+"}, function (err) {
    if (err) return console.log(err);
  });
}


/* -------------------  Public Port  ------------------- */
app.use(express.static("public"));
const PORT = process.env.PORT || LOCAL_HOST;
app.listen(PORT);
