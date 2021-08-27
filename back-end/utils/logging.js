const fs = require('fs').promises; //npm install fs

/* ------------------  LOGGING MODULE  ----------------- */
/**
 * TESTED
 * Logging module for any error that occurs in an endpoint - Writes error to a new file
 * File name sample format: "2021-08-01_login"
 * @param {Error} errMsg Error message outputted by the issue caused in endpoint
 * @param {String} endpoint Name of the endpoint
 * NOTE: IF PROBLEM OCCURS WHILE LOGGING, ERROR MESSAGE WILL BE PRINTED TO CONSOLE
 */
exports.loggingModule = async (errMsg, endpoint) => {
    let datetime = new Date();
    let fileName = "logs/" + datetime.toISOString().substring(0, 10) + "_" + endpoint + ".txt";
    console.log(errMsg); // for individual testing
    await fs.writeFile(fileName,"\n" + errMsg, {flag: "a+"}, function (err) {
        if (err) {
            console.log(err);
        }
    });
}