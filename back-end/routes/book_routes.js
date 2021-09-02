const express = require('express');

const { getMatchingBooks,
        getBookDetails,
        checkIfIsbnExists } = require('../controllers/book_controller');

const { loggingModule } = require('../utils/logging');
const { codes } = require('../utils/db');

const router = express.Router();

/**
 * Get books with given search parameters
 * Note: All parameters are optional (Should we require at least 1 parameter?)
 * If no books match search criteria... return an empty JSON Object
 */
router.get("/search", async function(req, res) {
	try {
		res.type("json");
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let resultLength = req.query.resultLength ? parseInt(req.query.resultLength) : 10;
		let books = await getMatchingBooks(req.query);
		res.status(codes.SUCCESS_CODE).json({
			remainingBooksInSearch : books.slice(offset + resultLength).length,
			books : books.slice(offset, offset + resultLength)
		});
	} catch (err) {
		loggingModule(err, "bookSearch");
		res.status(codes.SERVER_ERROR_CODE).json({ "error" : codes.SERVER_ERROR_MESSAGE });
	}
});

/**
 * Gets detailed information for book based on ISBN
 */
router.get("/detail/:isbn", async function(req, res) {
    try {
		res.type("JSON");
        let isbn = req.params.isbn;
        if (!isbn) {
            res.status(codes.CLIENT_ERROR_CODE_400).json({"error": "Missing ISBN Parameter"});
        } else {
			let exists = await checkIfIsbnExists(isbn);
			if (!exists) {
				res.status(codes.CLIENT_ERROR_CODE_400).json({"error": "Invalid ISBN"});
			} else {
				let results = await getBookDetails(isbn);
				res.json(results);
			}
		}
	} catch (err) {
		loggingModule(err, "bookDetail");
		res.status(codes.SERVER_ERROR_CODE).json({ "error" : codes.SERVER_ERROR_MESSAGE });
	}
});

module.exports = router;
