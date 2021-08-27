const { db } = require('../utils/db');

/**
 * @param {int} isbn Book ISBN number
 * @returns {boolean} True if a book exists with the given isbn, false otherwise
 * check if the book w/ the given isbn exists in our database
 */
exports.checkIfISBNExists = async (isbn) => {
    let query = "SELECT COUNT(*) AS count FROM Books WHERE Books.isbn = ?";
    let [count] = await db.query(query, isbn);
    return count[0].count > 0;
}

/**
 * Gets all of the books that match the given search query. Each book returned
 * will include its title, author(s) and isbn number.
 * @param {Object} info Search parameters provided by user
 * @returns {Object[]} List of books that satify the search query
 */
exports.getMatchingBooks= async (info) => {
	let title = info.title;
	let author = info.author;
	let genre = info.genre;

	let params = [];
	let query = `   DROP TEMPORARY TABLE IF EXISTS Results; CREATE TEMPORARY TABLE Results
					SELECT Books.title AS title, Authors.name AS author_name, Books.ISBN AS isbn
					FROM Books
					INNER JOIN Book_Authors
						ON Books.ISBN = Book_Authors.ISBN
					INNER JOIN Authors
						ON Book_Authors.id_author = Authors.id
					INNER JOIN Book_Genre
						ON Books.ISBN = Book_Genre.ISBN
					INNER JOIN Genre
						ON Book_Genre.id_genre = Genre.id
					WHERE 1=1
				`;
	if (title) {
		query += " AND Books.title = ?";
		params.push(title);
	}
	if (genre) {
		query += " AND Genre.name IN ?";
		params.push([genre]);
	}
	query += `;
		SELECT Results.title, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors, Results.isbn
		FROM Results
		GROUP BY Results.title, Results.isbn
	`;
	if (author) {
		query += "HAVING FIND_IN_SET(?, authors)";
		params.push(author);
	}
	query += `;`;
	return [await db.query(query, params)][0][0][2];
}

/**
 * @param {int} isbn Book ISBN number
 * @returns {JSON} json object containing the necessary book information (determined by API)
 */
exports.getBookDetails = async (isbn) => {
    let query = `
    DROP TEMPORARY TABLE IF EXISTS Results;
    CREATE TEMPORARY TABLE Results
    SELECT Books.title AS title, Books.date_published AS date_published, Authors.name AS author_name, Genre.name AS genre_name
    FROM Books
    INNER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN
    INNER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    INNER JOIN Book_Genre
        ON Books.ISBN = Book_Genre.ISBN
    INNER JOIN Genre
        ON Book_Genre.id_genre = Genre.id
    WHERE Books.ISBN = ?
    ;
    SELECT Results.title, Results.date_published, GROUP_CONCAT(DISTINCT Results.author_name SEPARATOR ',') AS authors, GROUP_CONCAT(DISTINCT Results.genre_name SEPARATOR ',') AS genres
    FROM Results
    GROUP BY Results.title, Results.date_published
    ;
    `
    let [results] = await db.query(query, isbn);
    return results[2];
}