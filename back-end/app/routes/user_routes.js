const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
			if (returns.length >= 1 && await bcrypt.compare(password, returns[0]["password"])) {
				// Create cookie
				const color_scheme = returns[0]["color_scheme"];
				const auth = jwt.sign({user: username}, process.env.JWT_KEY, {expiresIn: 60 * 60 * 24 * 2});
				const color = jwt.sign({color: color_scheme}, process.env.JWT_KEY, {expiresIn: 2147483000});
				res.status(codes.SUCCESS_CODE)
					.cookie('auth', auth, { httpOnly: false })
					.cookie('color', color, { httpOnly: false })
					.send("Login Successful");
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
			// Hash Password
			const salt = await bcrypt.genSalt(process.env.SALT | 10);
			const hashedPW = await bcrypt.hash(password, salt);
			// Create user
			let info = [username, hashedPW];
			await createUser(info);
			// Create cookies
			const auth = jwt.sign({user: username}, process.env.JWT_KEY, {expiresIn: 60 * 60 * 24 * 2});
			const color = jwt.sign({color: "light"}, process.env.JWT_KEY, {expiresIn: 2147483000});
			res.status(codes.SUCCESS_CODE)
				.cookie('auth', auth, { httpOnly: false })
				.cookie('color', color, { httpOnly: false })
				.send("Signup Successful");
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
                    let info = [color_scheme, username];
                    await updateColorScheme(info);
					// Create cookie
					const color = jwt.sign({color: color_scheme}, process.env.JWT_KEY, {expiresIn: 2147483000});
					res.status(codes.SUCCESS_CODE)
						.cookie('color', color, { httpOnly: false })
						.send("Color Scheme Updated Successfuly");
                }
            }
        }
	} catch (err) {
		loggingModule(err, "color_scheme");
		res.status(codes.SERVER_ERROR_CODE).send(codes.SERVER_ERROR_MESSAGE);
	}
});

/**
 * Update user color scheme
 */
 router.get("/grab/color_scheme", async (req, res) => {
	try {
		res.type("json");
		try {
			const color = req.cookies.color;
			const decoded = jwt.verify(color, process.env.JWT_KEY);
			res.status(codes.SUCCESS_CODE).send({color_scheme: decoded.color});
		} catch {
			// Create cookie
			const color = jwt.sign({color: "light"}, process.env.JWT_KEY, {expiresIn: 2147483000});
			res.status(codes.SUCCESS_CODE)
				.cookie('color', color, { httpOnly: false })
				.send({color_scheme: "light"});
		}
	} catch (err) {
		loggingModule(err, "grab_color_scheme");
		res.status(codes.SERVER_ERROR_CODE).send({"error": codes.SERVER_ERROR_MESSAGE});
	}
});

router.get("/grab/username", async (req, res) => {
	try {
		res.type("json");
		try {
			const auth = req.cookies.auth;
			const decoded = jwt.verify(auth, process.env.JWT_KEY);
			res.status(codes.SUCCESS_CODE).send({username: decoded.user});
		} catch {
			res.status(codes.CLIENT_ERROR_CODE_401).send({"error": "User not logged in"});
		}
	} catch (err) {
		loggingModule(err, "grab_user");
		res.status(codes.SERVER_ERROR_CODE).send({"error": codes.SERVER_ERROR_MESSAGE});
	}
});

module.exports = router;
