/**
 * Server-side API code for HuskyReads Project
 */
const express = require("express"); //npm install express
const multer = require("multer"); //npm install multer
const cors = require("cors"); //npm install cors

const userRoutes = require("./routes/user_routes");
const bookRoutes = require("./routes/book_routes");
const bookshelfRoutes = require("./routes/bookshelf_routes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.use('/', userRoutes);
app.use('/book', bookRoutes);
//app.use('/bookshelf', bookshelfRoutes);

 /* -------------------  Public Port  ------------------- */
app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);