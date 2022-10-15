import React from "react";
import axios from "axios";
import Navbar from "../../components/nav/Nav";
import HomePage from "./../home/Home";
import BookStandPage from "./../book-stand/BookStand";
import AboutPage from "./../about/About";
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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

  logoutFn = () => {
    this.setState({
      loggedIn: false,
      username: "",
      password: "",
      onLogin: true,
      onSignup: false
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
    if (error.response === undefined) {
      this.setState({
        errorMessage: "No connection to backend!"
      });
    } else {
      this.setState({
        errorMessage: error.response.data
      });
    }
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
    const BASE_URL = "https://husky-reads.herokuapp.com";
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
            <Navbar username={this.state.username} logoutFunction={this.logoutFn} />
            <Switch>
              <Route path="/bookstand">
                <BookStandPage username={this.state.username}/>
              </Route>
              <Route path="/about">
                <AboutPage/>
              </Route>
              <Route exact path="/">
                <HomePage username={this.state.username}/>
              </Route>
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </>

      );
    }

    return(
      <>
        <header id="top-left-header">HuskyReads</header>
        <div className="center">
          <header id="title"><h1>HuskyReads</h1></header>
          <header id="page-type"><h1>{this.state.onLogin ? "Log in" : "Sign up"}:</h1></header>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                id="username-box"
                className="input-box"
                name="username"
                placeholder="USERNAME"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                id="password-box"
                className="input-box"
                name="password"
                placeholder="PASSWORD"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div id ="error-message">
              {this.state.errorMessage}
            </div>

            <button id="submit" type="submit">{this.state.onLogin ? "LOGIN" : "SIGN UP"}</button>
          </form>

            <div id="change-page-type">{this.state.onLogin ? "Don't have an account yet?" : "Already have an account?"} </div>
            <button
              id="change-page-type-button"
              onClick={this.state.onLogin ? this.showSignUpPage : this.showLoginPage}>
              {this.state.onLogin ? <div>Sign up</div> : <div>Log in</div>}
            </button>
        </div>
      </>
    );
  }

}