import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export default function BookPage({ isbn, openPage, setBgClass, setPageClass, username, shelfStatus, setShelfStatus }) {
  const URL = "https://husky-reads.herokuapp.com";
  // const PORT = 8000;
  // expecting this base URL to change btw!
  const [selectedShelf, setSelectedShelf] = useState("default");
  const [addableShelves, setAddableShelves] = useState([]);
  const [removableShelves, setRemovableShelves] = useState([]);
  const [errorPage, setErrorPage] = useState(true);
  const [book, setBook] = useState({
    title: "",
    authors: [],
    genres: [],
    date_published: "",
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
      console.log("Getting book details for " + isbn);
      const GET_BOOK = "/books/detail/";
      try {
        if (isbn === undefined) {
          setErrorPage(true);
          console.log("No book given!");
        } else {
          setErrorPage(false);
          let fetchURL = URL + GET_BOOK + isbn;
          let bookData = await axios.get(fetchURL);
          setBook(bookData.data);
        }
      } catch (err) {
        console.log(err.toString());
        setErrorPage(true);
      }
    }
    console.log("Setting up bookpage with ISBN: " + isbn);
    getDetails();
    // updateBookshelfSelectors();
  }, [isbn]);


  useEffect(() => {
    if (!openPage) {
      setPageClass("bookpage-modal hidden");
      setBgClass("bookpage-bg hidden");
      setSelectedShelf("default");
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
      } else if (selectedShelf === "default") {
        setShelfStatus("Error: Please select a shelf category");
      } else {
        const data = {
          username: username,
          bookshelf: selectedShelf,
          isbn: isbn
        };
        // valid shelf selected by a logged-in user with a valid book!
        let fetchURL = URL + ADD_TO_SHELF;
        let response = await axios.post(fetchURL, data);
        setShelfStatus(response.data);
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
    // let add = [];
    // let remove = [];
    console.log("Getting shelf details for " + isbn);
    try {
      if (isbn === undefined) {
        setErrorPage(true);
        console.log("No book given!");
      } else {
        setErrorPage(false);
        let fetchURL = URL + GET_BOOK + username + "/" + isbn;
        let remove = (await axios.get(fetchURL)).data;
        setRemovableShelves(remove);
        let add = [];
        for (const [key, value] of Object.entries(labels)) {
          if (remove.indexOf(key) == -1) {
            add.push(key);
          }
        }
        setAddableShelves(add);
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
          <div id="bookstand-selectors">
            <select
              id="selector"
              onChange={(event) => {
                setSelectedShelf(event.target.value);
              }}
              value={selectedShelf}
            >
              <option value={"default"} className="opt">Choose Shelf</option>
              {/*
                addableShelves.map((shelf) => {
                  return <option value={shelf} className="opt">
                    {labels[shelf]}
                  </option>
                })
              */}
              <option value={"want_to_read"} className="opt">
                {labels["want_to_read"]}
              </option>
              <option value={"reading"} className="opt">
                {labels["reading"]}
              </option>
              <option value={"read"} className="opt">
                {labels["read"]}
              </option>
            </select>
            <button
              id="add-button"
              onClick={() => {
                addToShelf();
              }}
            >
              ADD TO SHELF
            </button>
          </div>
          <p>{shelfStatus !== "" && shelfStatus}</p>
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
            {book.date_published !== undefined &&
              book.date_published.slice(0, 10)}
          </p>
          <p>
            <strong>Description:</strong>
            <br />
            {book.description !== undefined && book.description}
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