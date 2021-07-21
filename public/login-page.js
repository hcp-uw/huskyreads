/**
 * This file deals with interactivity of the login page
 */

"use strict";

(function() {

  // start the actual program when DOM and stylesheet(s) load
  window.addEventListener('load', init);

  const PORT = 8000;
  const URL = "http://localhost:" + PORT;

  /**
   * function which kickstarts the whole program once the
   * necessary components(DOM and stylesheets) have loaded
   */
  function init() {

    console.log("hi");
    // add a button listener to login sumbit
    id("login-button").addEventListener("click", loginUser);

  }

  /**
   * This function gets called when the user clicks the submit
   * button to submit their username and password to login
   */
  async function loginUser() {

    let username = id("username").value;
    let password = id("password").value;

    const LOGIN_CREDENTIALS = {username, password}; // JS object
    const OPTIONS = {
      method: "POST",
      headers: { // meta deta—tells the api that the data is in JSON format
        "Content-type": "application/json"
      },

      // take the login credentials JSON and make it into a string
      body: JSON.stringify(LOGIN_CREDENTIALS)
    }

    let response = await fetch(URL + "/login", OPTIONS);
    let loginCredentialsValid = verifyUsernameAndPassword(response);

    // TODO: if login credentials are valid, login the user and bring them to their homepage
    if (loginCredentialsValid) {


    }

  }

  /**
   *
   * @param {Response Object} APIresponse - response object in plain text format
   * containing the response to the API call we made for the username and password
   * @returns {Boolean} - returns a boolean that respresents whether the username
   * and password that entered by the user was valid
   */
  function verifyUsernameAndPassword(APIresponse) {

    let responseText = APIresponse.text();
    if (responseText === "Login Successful") {

      // login was successful, hide any previous error messages
      hideErrorMessage("error-missing");
      hideErrorMessage("error-invalid-login");
      return true;
    } else if (responseText === " Missing username or password") {
      displayErrorMessage("error-missing");
      return false;
    } else if (responseText === "Invalid login credentials") {
      displayErrorMessage("error-invalid-login");
      return false;
    }

    return false;
  }

  function displayErrorMessage(errorMessage) {
    let errorElement = id(errorMessage);
    errorElement.classList.remove("hidden");
  }

  function hideErrorMessage(errorMessage) {
    let errorElement = id(errorMessage);
    errorElement.classList.add("hidden");
  }

  /**
   * Returns the DOM/HTML element which the caller of
   * this function wants
   * @param {String} elementID - element id
   * @returns {Element} - DOM element that caller wants
   */
  function id(elementID) {
    return document.getElementById(elementID);
  }

  /**
   * Returns the DOM/HTML element which the caller of
   * this function wants
   * @param {String} selector - tag selector
   * @returns {Element} - DOM element that caller wants
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Generates and returns the DOM/HTML element which the caller of
   * this function wants
   * @param {String} element - HTML element type
   * @returns {Element} - DOM element that caller wants
   */
  function gen(element) {
    return document.createElement(element);
  }

})();