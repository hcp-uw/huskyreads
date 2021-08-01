/**
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
const db = mysql.createPool({
  host: process.env.DB_URL || 'localhost',
  port: process.env.DB_PORT || '8889',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'databaseName'
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.use(express.static("public"));

const PORT = process.env.PORT || 8000;
app.listen(PORT);

/**
 * Logging module for any error that occurs in an endpoint - Writes error to a new file
 * File name sample format: "2021-08-01T20:36:31.346Z_login"
 * @param {*} errMsg Error message outputted by the issue caused in endpoint
 * @param {*} endpoint Name of the endpoint
 * NOTE: NOT YET TESTED (just write an endpoint and call this function)
 * NOTE: MAY NEED TO SPECIFY FILE PATH
 * NOTE: IF PROBLEM OCCURS WHILE LOGGING, ERROR MESSAGE WILL BE PRINTED TO CONSOLE
 */
function loggingModule (errMsg, endpoint) {
  const datetime = new Date();
  const fileName = datetime.toISOString() + "_" + endpoint;
  fs.writeFile(fileName, errMsg, {flag: "w+"}, function (err) {
    if (err) return console.log(err);
  });
}