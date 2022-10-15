const { db } = require('../utils/db');

/**
 * Creates new User with a unique username, and a password
 * Also creates the new user 3 default bookshelves
 * @param {String[]} userInfo - The new clients username and password
 */
exports.createUser = async (userInfo) => {
    let query = "INSERT INTO Users (username, password) VALUES (?, ?);";
	await db.query(query, userInfo);
    let userID = this.getUserID(userInfo);
    query = `INSERT INTO Bookshelves (id_user, shelf_name) VALUES
            (?, "reading"),
            (?, "read"),
            (?, "want_to_read")
            ;`;
    await db.query(query, [userID, userID, userID]);
}
//git request-pull fix-user-creation origin fixToQueryWithUserID
/**
 * Updates the User's current color scheme.
 * @param {String[]} userInfo - The clients username and color_scheme
 */
exports.updateColorScheme = async (userInfo) => {
    let query = "UPDATE Users SET color_scheme = ? WHERE username = ?";
    await db.query(query, userInfo);
}

/**
 * Returns the ID of the given username or 0 if the username does not exist
 * @param {String} username - The given username for the user
 * @returns {int} - The user's ID or 0 if the username does not exist
 */
exports.getUserID = async (username) => {
    let query = "SELECT id FROM Users WHERE Users.username = ?;"
    let [rows] = await db.query(query, [username]);
    if (!rows[0]) {
        return 0;
    } else {
        return rows[0].id;
    }
}

/**
 * Gets the given user's password
 * @param {String} username - The given username of the user
 * @returns - The row(s) in the database for the given user
 */
exports.getPassword = async (username) => {
	let query = "SELECT * FROM Users WHERE username = ?;";
	let [rows] = await db.query(query, [username]);
	return rows;
}