const { db } = require('../utils/db');

/**
 * Check if the given isbn corresponds to a book in the database
 * @param {int} isbn - The given book's isbn
 * @returns {boolean} - True if a book has the corresponding isbn
 */
exports.checkIfIsbnExists = async (isbn) => {
    let query = "SELECT COUNT(*) AS count FROM Books WHERE Books.ISBN = ?";
    let [count] = await db.query(query, [isbn]);
    return count[0].count > 0;
}

/**
 * Gets all of the books that match the given search query. Each book returned
 * will include its title, author(s) and isbn number.
 * @param {Object} info - Search parameters provided by the user
 * @returns {Object[]} - List of books that satisfy the given search query
 */
exports.getMatchingBooks= async (info) => {
	let title = info.title;
	let author = info.author;
	let genre = info.genre;

	let params = [];
	let query = `   SELECT Books.title AS title, Books.ISBN AS isbn,
                        GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors
                    FROM Books
                    LEFT OUTER JOIN Book_Authors
                        ON Books.ISBN = Book_Authors.ISBN_book
                    LEFT OUTER JOIN Authors
                        ON Book_Authors.id_author = Authors.id
                    LEFT OUTER JOIN Book_Genres
                        ON Books.ISBN = Book_Genres.ISBN_book
                    LEFT OUTER JOIN Genres
                        ON Book_Genres.id_genre = Genres.id
                    WHERE 1 = 1
				`;
	if (title) {
		query += " AND Books.title = ? ";
		params.push(title);
	}
	if (genre) {
		query += " AND Genres.name IN ? ";
		params.push([genre]);
	}
	query += "GROUP BY Books.title, Books.ISBN ";
	if (author) {
		query += "HAVING FIND_IN_SET(?, authors)";
		params.push(author);
	}
	query += `;`;
    result = await db.query(query, params);
	return result[0];
}

/**
 * Fetches the title, date published, description, author's name, and genre from the given book
 * @param {int} isbn- the given book's isbn number
 * @returns {JSON} data - JSON object containing the book information (determined by API)
 */
exports.getBookDetails = async (isbn) => {
    let query = `
    SELECT Books.title AS title, Books.date_published AS datePublished,
        Books.description AS description,
        GROUP_CONCAT(DISTINCT Authors.name SEPARATOR ',') AS authors,
        GROUP_CONCAT(DISTINCT Genres.name SEPARATOR ',') AS genres
    FROM Books
    LEFT OUTER JOIN Book_Authors
        ON Books.ISBN = Book_Authors.ISBN_book
    LEFT OUTER JOIN Authors
        ON Book_Authors.id_author = Authors.id
    LEFT OUTER JOIN Book_Genres
        ON Books.ISBN = Book_Genres.ISBN_book
    LEFT OUTER JOIN Genres
        ON Book_Genres.id_genre = Genres.id
    WHERE Books.ISBN = ?
    GROUP BY Books.title, Books.date_published
    ;
    `
    let [results] = await db.query(query, isbn);
    let data = results[0];
    if (data.authors) {
        data.authors = data.authors?.split(",");
    } else {
        data.authors = [];
    }
    if (data.genres) {
        data.genres = data.genres?.split(",");
    } else {
        data.genres = [];
    }
    return data;
}