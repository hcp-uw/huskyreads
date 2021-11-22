const { db } = require('../utils/db');

/**
 * Removes a book from a specified bookshelf for a given user
 * @param {int} userID - The id for the given user
 * @param {String} bookshelf - The name of the bookshelf to alter
 * @param {int} isbn - The isbn of the book to remove
 * @return {boolean} - True if the table was altered, false otherwise
 */
exports.deleteBookshelfRecord = async (userID, bookshelf, isbn) => {
    let query = "DELETE FROM Bookshelf WHERE id_user = ? AND isbn = ? AND shelf_name = ?;";
    let [rows] = await db.query(query, [userID, isbn, bookshelf])
    return rows.affectedRows > 0;
}

/**
 * Gets the book from the specified bookshelf
 * @param {String[]} info - The user's userID and the bookshelf being accessed
 * @returns - The bookshelf information of the user.
 */
exports.getBookshelf = async (info) => {
    let bookshelves = [];
    let query = "";

    if (info[1] === "all") {
        // Purpose of this is to add all distinct bookshelf names into an array, so we can iterate
        // over each bookshelf and get its corresponding books
        query = "SELECT DISTINCT Bookshelf.shelf_name FROM Bookshelf WHERE Bookshelf.id_user = ?";
        let [res] = await db.query(query, info[0]);
        for (let index = 0; index < res.length; index++) {
            bookshelves.push(res[index].shelf_name);
        }
    } else {
        bookshelves.push(info[1]);
    }

    // WILL DEFINITELY NEED TO MAKE THIS QUERY FASTER (SCALABILITY SINCE WE MIGHT NEED TO CALL THIS MULTIPLE TIMES)
	query =
    `
    DROP TEMPORARY TABLE IF EXISTS Shelves, Book_Data;
    CREATE TEMPORARY TABLE Shelves
        SELECT Bookshelf.ISBN AS ISBN, Bookshelf.shelf_name AS name
        FROM Bookshelf
        INNER JOIN User
            ON User.id = Bookshelf.id_user
        WHERE Bookshelf.shelf_name = ? AND User.id = ?
    ;
    CREATE TEMPORARY TABLE Book_Data
        SELECT Shelves.name AS shelfname, Books.title AS title, Books.ISBN AS ISBN
        FROM Books
        RIGHT JOIN Shelves
            ON Shelves.ISBN = Books.ISBN
    ;
    SELECT Book_Data.title, Book_Data.ISBN, GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Genre.name SEPARATOR ',') AS genres
    FROM Book_Data
    INNER JOIN Book_Authors
        ON Book_Data.ISBN = Book_Authors.ISBN
    INNER JOIN Book_Genre
        ON Book_Data.ISBN = Book_Genre.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Genre
        ON Book_Genre.id_genre = Genre.id
    GROUP BY Book_Data.shelfname, Book_Data.title, Book_Data.ISBN
    ;
    `

    let result = [];
    for (let bookshelfName of bookshelves) {
        let bookshelf = [];
        let [rows] = await db.query(query, [bookshelfName, info[0]]);
        let data = rows[3];
        for (let row of data) {
            let book = {
                "isbn": row.ISBN,
                "title": row.title,
                "authors": row.authors.split(","),  // should fix issue?
                "genres": row.genres.split(",")     // same here. Need testing
            };
            bookshelf.push(book);
        }

        result.push({"name": bookshelfName, "books": bookshelf});
    }

	return result;
}

/**
 * Adds a book to the specified bookshelf for a given user
 * @param {String} bookshelf - The name of the bookshelf to alter
 * @param {int} userID - The id for the given user
 * @param {int} isbn - The isbn of the book to add
 */
exports.insertBook = async (bookshelf, userID, isbn) => {
	let query = "INSERT INTO Bookshelf VALUES (?, ?, ?)";
	await db.query(query, [userID, isbn, bookshelf])
}

/**
 * Checks if the given Bookshelf name exists within the database
 * @param {String[]} shelfInfo - The userID of the user, and the Bookshelf being checked
 * @returns {boolean} - True if the bookshelf name exists
 */
exports.checkIfValidBookshelf = async (shelfInfo) => {
	if (shelfInfo[1] == "all") {
		return true;
	}

    let query = "SELECT Bookshelf.shelf_name FROM Bookshelf WHERE Bookshelf.id_user = ? AND Bookshelf.shelf_name = ?";
	let [res] = await db.query(query, [shelfInfo[0], shelfInfo[1]]);
	return res.length > 0;  // Needs to be non-zero
}

/**
 * Checks if the given book exists in the users given bookshelf.
 * @param {String} bookshelf - The given bookshelf
 * @param {int} userID - The user's associated ID
 * @param {int} isbn - The given isbn
 * @return {boolean} - True if the book is already in the bookshelf
 */
exports.checkIfBookExistsInBookshelf = async (bookshelf, userID, isbn) => {
    let query = "SELECT * FROM Bookshelf WHERE id_user = ? AND shelf_name = ? AND isbn = ?";
    let [rows] = await db.query(query, [userID, bookshelf, isbn]);
    return rows.length > 0;
}