const express = require('express');

const { getPassword,
        getUserID, 
        createUser,
        updateColorScheme } = require('../controllers/user_controller');

const { loggingModule } = require('../utils/logging');
const { codes } = require('../utils/db');

const router = express.Router();

/**
 * Login endpoint
 */
router.post("/login", async (req, res) => {
	try {
		res.type("text");
		let username = req.body.username;
		let password = req.body.password;
		if (!username || !password) {
			res.status(codes.CLIENT_ERROR_CODE_400).send("Missing username or password");
		} else {
			let returns = await getPassword(username);
			if (returns.length >= 1 && password === returns[0]["password"]) {
				res.status(codes.SUCCESS_CODE).send("Login Successful");
			} else {
				res.status(codes.CLIENT_ERROR_CODE_401).send("Invalid user credentials");
			}
		}
	} catch (err) {
		loggingModule(err, "login");
		res.status(codes.SERVER_ERROR_CODE).send(codes.SERVER_ERROR_MESSAGE);
	}
});

/**
 * Sign up endpoint (Create new User)
 */
router.post("/signup", async (req, res) => {
	try {
		res.type("text");
		let username = req.body.username;
		let password = req.body.password;
		if (!username || !password) {
			res.status(codes.CLIENT_ERROR_CODE_400).send("Missing username or password");
		} else if (await getUserID(username) !== 0) {
			res.status(codes.CLIENT_ERROR_CODE_400).send("Username already taken");
		} else {
			let info = [username, password];
			await createUser(info);
			res.status(codes.SUCCESS_CODE).send("Signup Successful");
		}
	} catch (err) {
		loggingModule(err, "signup");
		res.status(codes.SERVER_ERROR_CODE).send(codes.SERVER_ERROR_MESSAGE);
	}
});

/**
 * Update user color scheme
 */
router.post("/color_scheme", async (req, res) => {
	try {
		res.type("text");
		let username = req.body.username;
		let color_scheme = req.body.color_scheme;
		if (!username || !color_scheme) {
			res.status(codes.CLIENT_ERROR_CODE_400).send("Missing username or color_scheme");
		} else {
            let userId = await getUserID(username);
            if (!userId) {
                res.status(codes.CLIENT_ERROR_CODE_401).send("Invalid Username");
            } else {
                if (color_scheme != "light" && color_scheme != "dark") {
                    res.status(codes.CLIENT_ERROR_CODE_400).send("Invalid Color Scheme");
                } else {
                    let info = [username, color_scheme];
                    await updateColorScheme(info);
                    res.status(codes.SUCCESS_CODE).send("Color Scheme Updated Successfuly");
                }
            }
        }
	} catch (err) {
		loggingModule(err, "color_scheme");
		res.status(codes.SERVER_ERROR_CODE).send(codes.SERVER_ERROR_MESSAGE);
	}
});

module.exports = router;
