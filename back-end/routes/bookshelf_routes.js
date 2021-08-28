const express = require('express');

const { deleteBookshelfRecord,
        getBookshelf } = require('../controllers/bookshelf_controller');
const { getUserId } = require('../controllers/user_controller');

const { loggingModule } = require('../utils/logging');
const { codes } = require('../utils/db');

const router = express.Router();

/**
 * Get user's book in bookshelf, with default value "all" for bookshelf name
 */
router.get("/get/:username/:bookshelf", async function(req, res) {
	try {
		res.type("JSON");
		let username = req.params.username;
		let bookshelf = req.params.bookshelf;
		if (!username) {
			res.status(codes.CLIENT_ERROR_CODE_400).send({"error": "Missing username paramter"});
		} else if (bookshelf != "reading" && bookshelf != "read" && bookshelf != "want_to_read" && bookshelf != "all") {
            // I'll swap out this if statement with the method Nicholas wrote
            res.status(codes.CLIENT_ERROR_CODE_400).send({"error": "Invalid bookshelf name"});
        } else {
            let userID = await getUserId(username);
            if (!userID) {
                res.status(codes.CLIENT_ERROR_CODE_401).send({"error": "Invalid Username Parameter"});
            } 
			let info = [userID, bookshelf];
			let result = await getBookshelf(info);
			if (!result) {
				res.status(codes.CLIENT_ERROR_CODE_400).send({"error": "Invaild bookshelf name"});
			}
			res.status(codes.SUCCESS_CODE).send(result);
		}
	} catch (err) {
		loggingModule(err, "bookshelfGet");
		res.status(codes.SERVER_ERROR_CODE).send({"error": codes.SERVER_ERROR_MESSAGE});
	}
});

/**
 * Add book to bookshelf
 * (Check for duplicates within specific bookshelf)
 * (Do not need to check for overall duplicates? I assume?)
 */
router.post("/add", async (req, res) => {
	try {

	} catch (err) {
		loggingModule(err, "bookshelfAdd");
	}
});

/**
 * Remove book from bookshelf
 */
router.post("/remove", async (req, res) => {
    try {
        res.type("JSON");
        let username = req.body.username;
        let bookshelf = req.body.bookshelf;
        let isbn = req.body.isbn;
        if (!username || !bookshelf || !isbn) {
            res.status(codes.CLIENT_ERROR_CODE_400).send("Missing one or more required body parameters");
        } else  {
            let userId = await getUserId(username);
            if (userId == 0) {
                res.status(codes.CLIENT_ERROR_CODE_401).send("Invalid username");
            } else if (bookshelf != "reading" && bookshelf != "read" && bookshelf != "want_to_read") {
                // I'll swap out this if statement with the method Nicholas wrote
                res.status(codes.CLIENT_ERROR_CODE_400).send("Invalid bookshelf name");
            } else {
                let tableAltered = await deleteBookshelfRecord(userId, bookshelf, isbn);
                if (!tableAltered) {
                    res.status(codes.CLIENT_ERROR_CODE_400).send("Book does not exist in " + bookshelf);
                } else {
                    res.send("Book successfully removed from the bookshelf");
                }
            }
        }
    } catch (err) {
        loggingModule(err, "bookshelfRemove");
        res.status(codes.SERVER_ERROR_CODE).send(codes.SERVER_ERROR_MESSAGE);
    }
});

module.exports = router;
