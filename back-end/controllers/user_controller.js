const { db } = require('../utils/db');

/**
 * Creates new User based on info
 * @param {String[]} info
 */
exports.createUser = async (info) => {
    let query = "INSERT INTO User (username, password) VALUES (?, ?);";
    await db.query(query, info);
}

/**
 * Updates the User's current Color Scheme.
 * @param {String[]} info
 */
exports.updateColorScheme = async (info) => {
    let query = "UPDATE User SET color_scheme = ? WHERE username = ?";
    await db.query(query, info);
}

/**
 * Checks if username exists
 * @param {String} username
 * @returns {boolean} true if username already exists
 */
exports.checkIfUsernameExists = async (username) => {
    let query = "SELECT * FROM User WHERE username = ?;";
    let [rows] = await db.query(query, [username]);
    return (rows.length >= 1);
}

/**
 * Returns the id of the user with the given username or 0 if no user exists.
 * @param {String} username - The username of the user to get the id for.
 * @returns {int} The users id or 0 if no user exists with the username.
 */
exports.getUserId = async (username) => {
    let query = "SELECT id FROM User WHERE User.username = ?;"
    let [rows] = await db.query(query, [username]);
    if (!rows[0]) {
        return 0;
    } else {
        return rows[0].id;
    }
}

/**
 * Gets password from username
 * @param {String} username
 * @returns info of username
 */
exports.getPassword = async (username) => {
	let query = "SELECT * FROM User WHERE username=?;";
	let [rows] = await db.query(query, [username]);
	return rows;
}