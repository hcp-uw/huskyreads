import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "../login/Form";
import BookCard from '../../components/book-card/BookCard';
import "./index.css";

export default function BookStandPage(props) {

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
  // set up by Audrey to display each book under each bookshelf.

  // TODO: test if it's properly accounting for errors that can arise from this endpoint call,
  // such as cookie expiration or error codes.
  async function getShelves() {
    try {
      const GET_BOOKSTAND = "/bookshelves/get/"
      console.log(props.username);

      // check if user is still logged in
      if (props.username !== undefined) {
        // user is still logged in
        const BOOKSTAND = await axios.get(URL + GET_BOOKSTAND + props.username + "/reading");
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
        console.log("Username not passed in: " + props.username);
        returnToLogin = true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  getShelves();

  // decides what to show on the screen
  if (returnToLogin) {
    // force reloads the page to bring user back to the login page
    window.location.reload();
  } else if (errorPage) {
    return (
      <p>Error! Check console!</p>
    )
  } else {
    return (
      <div className="bookstand-container">
        <section className="bookstand-buttons">
          <div >
            My Wish List
          </div>
          <div>
            Books I've Read
          </div>
        </section>
        <section className="bookstand-selected-cat">
          <h3>Currently Reading</h3>
          <div className="bookstand-list">
            <BookCard img="images/sample.png" title="worm" author="aaa"/>
          </div>
        </section>
      </div>

    );
  }
}

