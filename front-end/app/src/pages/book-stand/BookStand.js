import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookStandPage() {

  const [bookStand, setBookStand] = useState();
  const GRAB_COOKIE_URL = "http://localhost:8000/grab/username";
  const SHELVES_URL = "http://localhost:8000/get/";
  let returnToLogin = false;
  let errorPage = false;

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

  async function getShelves() {
    const USERNAME = await axios.get(GRAB_COOKIE_URL)
      .then((res) => {return res.username})
      .catch((res) => {
        console.error(res.error);
        return undefined;
      });

    // TODO: test if it's properly accounting for errors that can arise from this endpoint call,
    // such as cookie expiration or error codes.
    let shelfList = undefined;
    if (USERNAME !== undefined) {
      shelfList = await axios.get(`${SHELVES_URL}${USERNAME}`)
        .catch((res) => {
          console.error(res.error);
          return undefined;
        });
    } else {
      returnToLogin = true;
    }

    // TODO: test if it's properly accounting for errors that can arise from this endpoint call,
    // such asr error codes.
    if (shelfList !== undefined) {
      setBookStand(shelfList);
    } else {
      errorPage = true;
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

