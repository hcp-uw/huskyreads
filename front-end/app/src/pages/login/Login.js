import React from "react";
import Form from "./Form";
import './index.css';
export default class Login extends React.Component {

  render() {
    return(
      <Form />
    );
  }

}
    // if (this.state.onLogin) {
    //   return(

    //     <div className="container">
    //         <header><h1>Husky Reads</h1></header>
    //         <Form pageType="Login" />
    //         <div>Don't have an account yet? </div>
    //         <button onClick={this.showSignUpPage}>Sign the hell up</button>

    //     </div>
    //   );
    // } else if (this.state.onSignup) {
    //   return(

    //     <div className="container">
    //         <header><h1>Husky Reads</h1></header>
    //         <Form pageType="Signup" />
    //         <div>Already have an account? </div>
    //         <button onClick={this.showLoginPage}>Log the hell in</button>

    //     </div>
    //   );

    // } else {
    //   return(
    //     <div>
    //       You don't exist
    //     </div>
    //   );