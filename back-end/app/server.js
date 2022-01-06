/**
 * Server-side API code for HuskyReads Project
 */
const express = require("express"); //npm install express
const multer = require("multer"); //npm install multer
const cors = require("cors"); //npm install cors
const cookieParser = require("cookie-parser");
require('dotenv').config();

const userRoutes = require("./routes/user_routes");
const bookRoutes = require("./routes/book_routes");
const bookshelfRoutes = require("./routes/bookshelf_routes");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.use('/', userRoutes);
app.use('/books', bookRoutes);
app.use('/bookshelves', bookshelfRoutes);

app.get('/test', function (req, res) {
    res.type("text").send("SUCCESS");
})

 /* -------------------  Public Port  ------------------- */
app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);