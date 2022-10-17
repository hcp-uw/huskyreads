import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "../../components/book-card/BookCard";
import BookPage from "../book-page/BookPage";
import "./index.css";

export default function BookStandPage(props) {
  const [selected, setSelected] = useState("reading");
  const [unselected, setUnselected] = useState(["read", "want_to_read"]);
  const [booksDisplay, setDisplay] = useState([]);
  const [selectedISBN, setISBN] = useState();
  const [openPage, setOpen] = useState(false);
  const [pageClass, setPageClass] = useState("bookpage-modal ");
  const [bgClass, setBgClass] = useState("bookpage-bg ");
  const [shelfStatus, setShelfStatus] = useState("");
  const handleClick = useCallback((isbn) => {
    setOpen(!openPage);
    setISBN(isbn);
  }, [openPage])

  let returnToLogin = false;
  let errorPage = false;
  const URL = "https://husky-reads.herokuapp.com";
  const labels = {
    "reading": "Currently Reading",
    "read": "Books I've Read",
    "want_to_read": "My Wish List",
  };

  // plan: Using the username passed in through props, we get
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
          console.log("Selected bookshelf: " + selected);
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
      console.log(err.toString());
      returnToLogin = true;
    }
  }

  useEffect(() => {
    let newUnselected = [];
    for (let shelf_key in labels) {
      if (shelf_key !== selected) {
        newUnselected.push(shelf_key);
      }
    }
    setUnselected(newUnselected);
    getShelves();
  }, [selected]);

  // decides what to show on the screen
  if (returnToLogin) {
    // force reloads the page to bring user back to the login page
    window.location.reload();
    return null;
  } else if (errorPage) {
    return <p>Error: Unable to retrieve shelf & book details</p>;
  } else {
    return (
      <div className="bookstand-container">
        <section className="bookstand-buttons">
          {Array.from(unselected).map((shelfName) => {
            return (
              <div
                key={shelfName}
                onClick={() => setSelected(shelfName)}
              >
                <p>{labels[shelfName]}</p>
              </div>
            );
          })}
        </section>
        <section className="bookstand-selected-cat">
          <h3 style={{ fontSize: "1.38em" }}>{labels[selected]}</h3>
          <div className="bookstand-list">
            {booksDisplay.map((book) => {
              return (
                <BookCard
                  key={book.isbn}
                  img={
                    "https://covers.openlibrary.org/b/isbn/" +
                    book.isbn +
                    "-M.jpg?default=false"
                  }
                  title={book.title}
                  authors={book.authors}
                  isbn={book.isbn}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
          <div className={bgClass} onClick={() => {setOpen(false); setShelfStatus("");}}></div>
          <div className={pageClass}>
            <BookPage
              isbn={selectedISBN}
              openPage={openPage}
              setPageClass={setPageClass}
              setBgClass={setBgClass}
              username={props.username}
              shelfStatus={shelfStatus}
              setShelfStatus={setShelfStatus}
              refreshBookstand={getShelves}
            />
          </div>
        </section>
      </div>
    );
  }
}
