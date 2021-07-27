/**
 * DO NOT RUN THIS CODE IN SQL, SINCE IT REQUIRES PARAMETERS WE WILL RUN IT IN THE NODE.JS FILE
**/

/* Login Endpoint */
/* username, password are given parameters */
/* If empty, then login failed, otherwise login success + output color scheme*/
SELECT User.color_scheme AS color_scheme
FROM User
WHERE User.username = username
AND User.password = password
;


/* Create new user */
/* username, password are given parameters */
/* Try-Catch this since username needs to be unique! (User.username is a unique field) */
INSERT INTO User (username, password) VALUES (username parameter, password parameter);


/* Accessing User Bookshelves */
/* Valid Bookshelf Names: "reading", "read", "want_to_read" */
SELECT 
FROM User, Bookshelf, Books