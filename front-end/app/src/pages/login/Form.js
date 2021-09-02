import React from "react";
import axios from "axios";
import Navbar from "../../components/nav/Nav";
import HomePage from "./../home/Home";
import BookStandPage from "./../book-stand/BookStand";
import AboutPage from "./../about/About";
import SettingsPage from "./../settings/Settings";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class Form extends React.Component {

  state = {
    username: "",
    password: "",
    errorMessage: "",
    loggedIn: false,
    onLogin: true,
    onSignup: false
  };

  showSignUpPage = () => {
    this.setState({
      onSignup: true,
      onLogin: false,
      errorMessage: ""
    });
  }

  showLoginPage = () => {
    this.setState({
      onLogin: true,
      onSignup: false,
      errorMessage: ""
    });
  }

  /**
   * TODO: implement more user friendly messages later
   * This function handles displaying an error to the user if
   * their login/signup credentials failed
   * @param {Error} error - error response from failed
   * user login/signup
   */
  handleError = (error) => {
    const errorMessage = error.response.data;
    this.setState({
      errorMessage: errorMessage
    });
  }

  /**
   * This function handles bringing the user to the homepage
   * if they've successfully logged in or signed up
   */
  handleSuccess = () => {
    this.setState({
      errorMessage: "",
      loggedIn: true
    });
  }

  // make call to API to validate the username and password
  validate = async () => {

    const usernameInput = this.state.username;
    const passwordInput = this.state.password;

    // update the states missing credentials and invalid credentials
    // according to the API response
    const BASE_URL = "http://localhost:8000";
    const endpoint = this.state.onLogin ? "/login" : "/signup";

    const params = {
      username: usernameInput,
      password: passwordInput
    }

    try {
      await axios.post(BASE_URL + endpoint, params);
      this.handleSuccess();
    } catch(error) {
      this.handleError(error);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {

    // prevents the form from being refreshed when clicking submit button
    event.preventDefault();
    this.validate();

  }

  render() {

    if (this.state.loggedIn) {
      return(
        <>
          <Router>
            <Navbar/>
            <Switch>
              <Route path="/bookstand">
                <BookStandPage/>
              </Route>
              <Route path="/settings">
                <SettingsPage/>
              </Route>
              <Route path="/about">
                <AboutPage/>
              </Route>

              <Route path="/browse">
                <HomePage/>
              </Route>
              {/* remove lines 32-34 later
              <Route path="/book-page">
                <BookPage/>
              </Route>
              */}
            </Switch>
          </Router>
        </>

      );
    }

    return(

      <div>
        <header><h1>Husky Reads</h1></header>
        <header><h1>{this.state.onLogin ? "Log in" : "Sign up"}:</h1></header>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              // type="password" -> uncomment this if you actually want
              // passwords to show up as black dots when typed in(like
              // what you usually see on websites when you type in a password)
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div
            style={{ fontSize: 12, color: "red"}}>
            {this.state.errorMessage}
          </div>

          <button type="submit">{this.state.onLogin ? "Login" : "Sign up"}</button>
        </form>

        <div>{this.state.onLogin ? "Don't have an account yet?" : "Already have an account?"} </div>
        <button
          onClick={this.state.onLogin ? this.showSignUpPage : this.showLoginPage}>
          {this.state.onLogin ? "Sign the hell up" : "Log the hell in"}
        </button>

      </div>

    );
  }

}