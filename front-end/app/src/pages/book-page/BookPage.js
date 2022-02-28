import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export default function BookPage({ isbn, openPage, setBgClass, setPageClass, username, shelfStatus, setShelfStatus }) {
  const URL = "https://husky-reads.herokuapp.com";
  // const PORT = 8000;
  // expecting this base URL to change btw!
  const [selectedShelf, setSelectedShelf] = useState("default");
  const [errorPage, setErrorPage] = useState(true);
  const [book, setBook] = useState({
    title: "",
    authors: [],
    genres: [],
    date_published: "",
    description: "",
  });
  let ref = useRef(null);

  // calls the the book constructor
  useEffect(() => {
    async function axiosCall() {
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

    axiosCall();
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

  // TODO: Figure out how to preset the select tag to show the option that the user had originally
  // picked if the book is already in their bookstand. Might do search? Or request backend
  // to make a contains method?

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
              <option value={"default"} className="opt" selected>Choose Shelf</option>
              <option value={"want_to_read"} className="opt">
                Plan to Read
              </option>
              <option value={"reading"} className="opt">
                Currently Reading
              </option>
              <option value={"read"} className="opt">
                Finished
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
          {/* TODO: Test the preliminary code below for multiple authors/genres! */}
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
