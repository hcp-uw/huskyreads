import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../../components/book-card/BookCard";
import "./index.css";

export default function BookStandPage(props) {
  const [selected, setSelected] = useState("reading");
  const [unselected, setUnselected] = useState(new Set("read", "want_to_read"));
  const [booksDisplay, setDisplay] = useState([]);
  const categories = ["reading", "read", "want_to_read"];

  let returnToLogin = false;
  let errorPage = false;
  const PORT = 8000;
  const URL = "http://localhost:" + PORT;
  const labels = {
    reading: "Currently Reading",
    read: "Books I've Read",
    want_to_read: "My Wish List",
  };

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
      const GET_BOOKSTAND = "/bookshelves/get/";

      // check if user is still logged in
      if (props.username !== undefined) {
        // user is still logged in
        const BOOKSTAND = await axios.get(
          URL + GET_BOOKSTAND + props.username + "/" + selected
        );
        if (BOOKSTAND.error === undefined) {
          // bookstand fetch worked
          setDisplay(BOOKSTAND.data[0].books);
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

  useEffect(() => {
    // find unselected categories & add them to a Set
    let set = new Set();
    for (let i = 0; i < categories.length; i++) {
      if (categories[i] !== selected) {
        set.add(categories[i]);
      }
    }
    setUnselected(set);
    getShelves();
  }, [selected]);

  // decides what to show on the screen
  if (returnToLogin) {
    // force reloads the page to bring user back to the login page
    window.location.reload();
  } else if (errorPage) {
    return <p>Error! Check console!</p>;
  } else {
    console.log(booksDisplay);

    return (
      <div className="bookstand-container">
        <section className="bookstand-buttons">
          {Array.from(unselected).map((str) => {
            return (
              <div
                onClick={() => {
                  setSelected(str);
                }}
              >
                <p>{labels[str]}</p>
              </div>
            );
          })}
        </section>
        <section className="bookstand-selected-cat">
          <h3 style={{fontSize: "1.38em"}}>{labels[selected]}</h3>
          <div className="bookstand-list">
            {
              booksDisplay.map(book => {
                return <BookCard title={book.title} authors={book.authors} isbn={book.isbn} />
              })
            }
          </div>
        </section>
      </div>
    );
  }
}
