const { db } = require('../utils/db');

/**
 * Creates new User with a unique username, and a password
 * @param {String[]} userInfo - The new clients username and password
 */
exports.createUser = async (userInfo) => {
    let query = "INSERT INTO User (username, password) VALUES (?, ?);";
	await db.query(query, userInfo);
}

/**
 * Updates the User's current color scheme.
 * @param {String[]} userInfo - The clients username and color_scheme
 */
exports.updateColorScheme = async (userInfo) => {
    let query = "UPDATE User SET color_scheme = ? WHERE username = ?";
    await db.query(query, userInfo);
}

/**
 * Checks if the given username already exists
 * @param {String} username - The given username 
 * @returns {boolean} - True if the given username already exists
 */
exports.checkIfUsernameExists = async (username) => {
    let query = "SELECT * FROM User WHERE username = ?;";
    let [rows] = await db.query(query, [username]);
    return (rows.length >= 1);
}

/**
 * Returns the ID of the given username or 0 if the username does not exist
 * @param {String} username - The given username for the user
 * @returns {int} - The user's ID or 0 if the username does not exist
 */
exports.getUserID = async (username) => {
    let query = "SELECT id FROM User WHERE User.username = ?;"
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
	let query = "SELECT * FROM User WHERE username=?;";
	let [rows] = await db.query(query, [username]);
	return rows;
}