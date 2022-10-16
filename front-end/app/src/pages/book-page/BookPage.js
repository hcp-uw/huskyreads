import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export default function BookPage({ isbn, openPage, setBgClass, setPageClass, username, shelfStatus, setShelfStatus, refreshBookstand }) {
  const URL = "https://husky-reads.herokuapp.com";
  const [selectedAddShelf, setSelectedAddShelf] = useState("default");
  const [selectedRemoveShelf, setSelectedRemoveShelf] = useState("default");
  const [addableShelves, setAddableShelves] = useState([]);
  const [removableShelves, setRemovableShelves] = useState([]);
  const [errorPage, setErrorPage] = useState(true);
  const [book, setBook] = useState({
    title: "",
    authors: [],
    genres: [],
    datePublished: "",
    description: "",
  });
  const labels = {
    reading: "Currently Reading",
    read: "Books I've Read",
    want_to_read: "My Wish List",
  };
  let ref = useRef(null);

  // calls the the book constructor
  useEffect(() => {
    async function getDetails() {
      const GET_BOOK = "/books/detail/";
      try {
        if (isbn === undefined) {
          setErrorPage(true);
        } else {
          setErrorPage(false);
          let fetchURL = URL + GET_BOOK + isbn;
          let bookData = await axios.get(fetchURL);
          // empty authors/genres list check
          if (bookData.data?.authors?.length === 0) {
            bookData.data.authors = ["Unknown"];
          }
          if (bookData.data?.genres?.length === 0) {
            bookData.data.genres = ["Unknown"];
          }
          setBook(bookData.data);
        }
      } catch (err) {
        console.log(err.toString());
        setErrorPage(true);
      }
    }
    getDetails();
    // call the function below to set up the initial add/remove dropdowns
    updateBookshelfSelectors();
  }, [isbn]);

  // controls the reveal-hide effect of the Bookpage modal
  useEffect(() => {
    if (!openPage) {
      setPageClass("bookpage-modal hidden");
      setBgClass("bookpage-bg hidden");
      setSelectedAddShelf("default");
      setSelectedRemoveShelf("default");
    } else {
      const timer = setTimeout(() => {
        setPageClass("bookpage-modal");
        setBgClass("bookpage-bg");
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [openPage]);


  /**
   * Adds the current book to the shelf chosen by the user in the drop-down menu.
   */
  async function addToShelf() {
    const ADD_TO_SHELF = "/bookshelves/add";
    try {
      if (!username) {
        // user is not logged in, send to login page
        console.log("Username not passed in: " + username);
      } else if (selectedAddShelf === "default") {
        setShelfStatus("Error: Please select a shelf category");
      } else {
        const data = {
          username: username,
          bookshelf: selectedAddShelf,
          isbn: isbn
        };
        // valid shelf selected by a logged-in user with a valid book!
        let fetchURL = URL + ADD_TO_SHELF;
        let response = await axios.post(fetchURL, data);
        setShelfStatus(response.data);
        // now update the options that the user has
        await updateBookshelfSelectors();
        if (typeof refreshBookstand === 'function') {
          await refreshBookstand();
        }
      }
    } catch (err) {
      setShelfStatus(err.toString());
    }
  }

  /**
  * Removes the current book from the shelf chosen by the user in the drop-down menu.
  */
  async function removeFromShelf() {
    const REMOVE_FROM_SHELF = "/bookshelves/remove";
    try {
      if (!username) {
        // user is not logged in, send to login page
        console.log("Username not passed in: " + username);
      } else if (selectedRemoveShelf === "default") {
        setShelfStatus("Error: Please select a shelf category");
      } else {
        const data = {
          username: username,
          bookshelf: selectedRemoveShelf,
          isbn: isbn
        };
        // valid shelf selected by a logged-in user with a valid book!
        let fetchURL = URL + REMOVE_FROM_SHELF;
        let response = await axios.post(fetchURL, data);
        setShelfStatus(response.data);

        // now update the options that the user has
        await updateBookshelfSelectors();
        if (typeof refreshBookstand === 'function') {
          await refreshBookstand();
        }
      }
    } catch (err) {
      setShelfStatus(err.toString());
    }
  }

  /**
   * Update the addableShelves and removableShelves hooks so that the user can
   * see what shelves they can add their books to or what shelves they can
   * remove their books from.
   */
  async function updateBookshelfSelectors() {
    const GET_BOOK = "/bookshelves/book/";
    try {
      if (isbn === undefined) {
        setErrorPage(true);
      } else {
        setErrorPage(false);
        let fetchURL = URL + GET_BOOK + username + "/" + isbn;
        let remove = (await axios.get(fetchURL)).data;
        setRemovableShelves(remove);
        let add = [];
        for (const [key, value] of Object.entries(labels)) {
          if (remove.indexOf(key) === -1) {
            add.push(key);
          }
        }
        setAddableShelves(add);
        setSelectedAddShelf("default");
        setSelectedRemoveShelf("default");
      }
    } catch (err) {
      console.log(err.toString());
      setErrorPage(true);
    }
  }

  if (errorPage) {
    return <p>Error: Unable to retrieve book details</p>;
  } else {
    return (
      <div className="bookpage-container">
        <section id="left-column">
          <img
            ref={ref}
            id="imagebox"
            src={
              "https://covers.openlibrary.org/b/isbn/" +
              isbn +
              "-L.jpg?default=false"
            }
            alt="book cover"
            onError={() => {
              ref.current.src = "images/default-cover.png";
            }}
          ></img>
          <div className="shelf-actions">
            <div className="bookstand-selectors">
              <select
                className="selector"
                onChange={(event) => {
                  setSelectedAddShelf(event.target.value);
                }}
                // value={selectedAddShelf}
                defaultValue={selectedAddShelf}
              >
                <option value={"default"} className="opt">Choose Shelf</option>
                {
                  addableShelves.map((shelf) => {
                    return <option key={shelf} value={shelf} className="opt">{labels[shelf]}</option>
                  })
                }
              </select>
              <button
                className="add-button"
                onClick={() => {
                  addToShelf();
                }}
              >
                ADD BOOK
              </button>
            </div>
            <div className="bookstand-selectors">
              <select
                className="selector"
                onChange={(event) => {
                  setSelectedRemoveShelf(event.target.value);
                }}
                // value={selectedRemoveShelf}
                defaultValue={selectedRemoveShelf}
              >
                <option value={"default"} className="opt">Choose Shelf</option>
                {
                  removableShelves.map((shelf) => {
                    return <option key={shelf} value={shelf} className="opt">{labels[shelf]}</option>
                  })
                }
              </select>
              <button
                className="remove-button"
                onClick={() => {
                  removeFromShelf();
                }}
              >
                REMOVE BOOK
              </button>
            </div>
          </div>
          <p id="status-text">{shelfStatus !== "" && shelfStatus}</p>
        </section>
        <section id="right-column">
          <h1>{book.title !== undefined && book.title}</h1>
          <hr />
          <p>
            <strong>Author(s): </strong>
            {
              // Builds the list of authors to display to user
              book.authors.map((author) => {
                if (author !== book.authors[book.authors.length - 1]) {
                  return `${author}, `;
                }
                return author;
              })
            }
          </p>
          <p>
            <strong>Genre(s): </strong>
            {
              // Builds the list of genres to display to user
              book.genres.map((genre) => {
                if (genre !== book.genres[book.genres.length - 1]) {
                  return `${genre}, `;
                }
                return genre;
              })
            }
          </p>
          <p>
            <strong>Date Published: </strong>
            {book.datePublished !== undefined &&
              book.datePublished.slice(0, 10)}
          </p>
          <p>
            {book.description && <strong>Description:</strong>}
            <br />
            {book.description && book.description}
          </p>
        </section>
      </div>
    );
  }
}

/*   reminder from api doc that bookdata will come as
  {
    "title": "Hunger Games",
    "authors": ["Suzanne Collins"],
    "genres": ["Young Adult", "Dystopian"],
    "datePublished": "2012-12-20",
    "description": "Katniss Everdeen fights the distopian government"
  }
*/