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
