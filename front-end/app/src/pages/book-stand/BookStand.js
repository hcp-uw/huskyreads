import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookStandPage() {

  const [bookStand, setBookStand] = useState([]);

  let returnToLogin = false;
  let errorPage = false;
  const PORT = 8000;
  const URL = "http://localhost:" + PORT;

  // plan: get the username from the client by getting it from their cookie
  // with "http://localhost:8000/grab/username". Using that username, we get
  // the bookshelves via bookshelves/get/:username/:(optional)bookshelf,
  // which returns a list of 3 objects, one object per shelf type
  // implement the scroll function used in the browse page and use the BookCard
  // set up by Audrey to describe each shelf.

  // calls the the book constructor ONCE
  useEffect(() => {
    getShelves();
  }, []);

  // TODO: test if it's properly accounting for errors that can arise from this endpoint call,
  // such as cookie expiration or error codes.
  async function getShelves() {
    try {
      const GET_BOOKSTAND = "/bookshelves/get/"
      const GRAB_COOKIE_URL = URL + "/grab/username";
      const USERNAME = await axios.get(GRAB_COOKIE_URL);

      // check if user is still logged in
      if (USERNAME.error === undefined) {
        // user is still logged in
        const BOOKSTAND = await axios.get(URL + GET_BOOKSTAND + USERNAME.username);
        if (BOOKSTAND.error === undefined) {
          // bookstand fetch worked
          setBookStand(BOOKSTAND);
        } else {
          // bookstand fetch didn't work
          console.log(BOOKSTAND.error);
          errorPage = true;
        }
      } else {
        // user is not logged in, send to login page
        console.log(USERNAME.error);
        returnToLogin = true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // decides what to show on the screen
  if (returnToLogin) {
    // need to log out the user using post request with logout URL
    // then return the login/signup page
    return (
      <Form />
    );
  } else if (errorPage) {
    return (
      <p>Error! Check console!</p>
    )
  } else {
    return (
      <div>Book stand</div>
    );
  }
}

