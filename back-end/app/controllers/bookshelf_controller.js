const { db } = require('../utils/db');

/**
 * Removes a book from a specified bookshelf for a given user
 * @param {int} userID - The id for the given user
 * @param {String} bookshelfName - The name of the bookshelf to alter
 * @param {int} isbn - The isbn of the book to remove
 * @return {boolean} - True if the table was altered, false otherwise
 */
exports.deleteBookshelfRecord = async (userID, bookshelfName, isbn) => {
    let query = `SELECT Bookshelves.id AS bookshelf_id
                FROM Bookshelves
                WHERE Bookshelves.id_user = ?
                AND Bookshelves.shelf_name = ?
                ;`;
    let bookshelfid = await db.query(query, [userID, bookshelfName])
    bookshelfid = bookshelfid[0][0].bookshelf_id;
    query = `DELETE FROM Bookshelf_Books
            WHERE Bookshelf_Books.id_bookshelf = ?
            AND Bookshelf_Books.ISBN = ?
            ;`
    let [rows] = await db.query(query, [bookshelfid, isbn])
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
        query = "SELECT shelf_name FROM Bookshelves WHERE id_user = ?";
        let [res] = await db.query(query, info[0]);
        for (let index = 0; index < res.length; index++) {
            bookshelves.push(res[index].shelf_name);
        }
    } else {
        bookshelves.push(info[1]);
    }

	query =
    `
    DROP TABLE IF EXISTS Shelves, Book_Data;
    CREATE TEMPORARY TABLE Shelves
        SELECT Bookshelves.shelf_name AS shelfname, Bookshelf_Books.ISBN AS ISBN
        FROM Bookshelves
        INNER JOIN Bookshelf_Books
            ON Bookshelves.id = Bookshelf_Books.id_bookshelf
        WHERE Bookshelves.shelf_name = ?
        AND Bookshelves.id_user = ?
    ;
    CREATE TEMPORARY TABLE Book_Data
        SELECT Shelves.shelfname AS shelfname, Books.title AS title, Books.ISBN AS ISBN
        FROM Books
        INNER JOIN Shelves
            ON Shelves.ISBN = Books.ISBN
    ;
    SELECT Book_Data.shelfname, Book_Data.title, Book_Data.ISBN,
        GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors,
        GROUP_CONCAT(DISTINCT Genres.name SEPARATOR ',') AS genres
    FROM Book_Data
    INNER JOIN Book_Authors
        ON Book_Data.ISBN = Book_Authors.ISBN_book
    INNER JOIN Book_Genres
        ON Book_Data.ISBN = Book_Genres.ISBN_book
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Genres
        ON Book_Genres.id_genre = Genres.id
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
                "authors": row.authors.split(","),
                "genres": row.genres.split(",")
            };
            bookshelf.push(book);
        }
        result.push({"name": bookshelfName, "books": bookshelf});
    }

	return result;
}

/**
 * Adds a book to the specified bookshelf for a given user
 * @param {String} bookshelfName - The name of the bookshelf to alter
 * @param {int} userID - The id for the given user
 * @param {int} isbn - The isbn of the book to add
 */
exports.insertBook = async (bookshelfName, userID, isbn) => {
    let query = `SELECT Bookshelves.id AS id_bookshelf
                FROM Bookshelves
                WHERE Bookshelves.id_user = ?
                AND Bookshelves.shelf_name = ?
                ;`
    let bookshelfid = await db.query(query, [userID, bookshelfName]);
    bookshelfid = bookshelfid[0][0].id_bookshelf;
	query = "INSERT INTO Bookshelf_Books VALUES (?, ?)";
	await db.query(query, [bookshelfid, isbn])
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

    let query = "SELECT shelf_name FROM Bookshelves WHERE shelf_name = ?";
	let [res] = await db.query(query, shelfInfo[1]);
	return res.length > 0;
}

/**
 * Checks if the given book exists in the users given bookshelf.
 * @param {String} bookshelfName - The given bookshelf
 * @param {int} userID - The user's associated ID
 * @param {int} isbn - The given isbn
 * @return {boolean} - True if the book is already in the bookshelf
 */
exports.checkIfBookExistsInBookshelf = async (bookshelfName, userID, isbn) => {
    let query = "SELECT Bookshelves.id AS id_bookshelf FROM Bookshelves WHERE id_user = ? AND shelf_name = ?";
    let bookshelfid = await db.query(query, [userID, bookshelfName]);
    bookshelfid = bookshelfid[0][0].id_bookshelf;
    query = "SELECT * from Bookshelf_Books WHERE id_bookshelf = ? AND ISBN = ?";
    let [rows] = await db.query(query, [bookshelfid, isbn]);
    return rows.length > 0;
}

/**
 * Returns a list of bookshelf names that the given user owns which contain the
 * specified book.
 * @param {int} userID - The user's associated ID
 * @param {int} isbn - The target book's isbn number
 * @returns {String[]} - List of names of bookshelves that contain the target book
 */
exports.getUserBookshelvesWithBook = async (userID, isbn) => {
    let query = `SELECT Bookshelves.shelf_name AS shelf_name
                FROM Bookshelves
                INNER JOIN Bookshelf_Books
                    ON Bookshelves.id = Bookshelf_Books.id_bookshelf
                WHERE Bookshelves.id_user = ?
                AND Bookshelf_Books.ISBN = ?;`
    let [rows] = await db.query(query, [userID, isbn]);
    let bookshelfNames = [];
    for (let row of rows) {
        bookshelfNames.push(row.shelf_name);
    }
    return bookshelfNames;
}