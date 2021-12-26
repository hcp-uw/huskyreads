import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function BookPage({ isbn, openPage, setBgClass, setPageClass }) {
  const URL = "http://localhost:";
  const PORT = 8000;
  // expecting this base URL to change btw!!
  const [errorPage, setErrorPage] = useState(false);

  // I instantiated the object initially to withstand any potential errors
  // that could be thrown.
  const [book, setBook] = useState({
    title: "",
    authors: [],
    genres: [],
    date_published: "",
    description: "",
  });

  // calls the the book constructor

  useEffect(() => {
    async function axiosCall() {
      const GET_BOOK = "/books/detail/";
      try {
        if (isbn === undefined) {
          setErrorPage(true);
        } else {
          let fetchURL = URL + PORT + GET_BOOK + isbn;
          let bookData = await axios.get(fetchURL);
          setBook(bookData.data);
        }
      } catch (err) {
        console.log(err);
        setErrorPage(true);
      }
    }

    axiosCall();
  }, [isbn]);

  useEffect(() => {
    if (!openPage) {
      setPageClass("browse-bookpage-modal hidden");
      setBgClass("browse-bookpage-bg hidden");
    } else {
      const timer = setTimeout(() => {
        setPageClass("browse-bookpage-modal");
        setBgClass("browse-bookpage-bg");
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [openPage]);

  // if (!openPage) {
  //   setPageClass("browse-bookpage-modal hidden");
  //   setBgClass("browse-bookpage-bg hidden");
  // } else {
  //   let timerID = setTimeout(() => {
  //     setPageClass("browse-bookpage-modal");
  //     setBgClass("browse-bookpage-bg");
  //   }, 500);
  //   clearTimeout(timerID);

  // }

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.statusText);
    }
    return res;
  }

  if (errorPage) {
    return <p>Error! Check console!</p>;
  } else {
    return (
      <>
        <section id="left-column">
          <img id="imagebox"></img>
          <div id="bookstand-selectors">
            <select id="selector">
              <option className="opt">Choose Shelf</option>
              <option className="opt">Plan to Read</option>
              <option className="opt">Currently Reading</option>
              <option className="opt">Finished</option>
            </select>
            <button id="add-button">ADD TO BOOKSTAND</button>
          </div>
        </section>
        <section id="right-column">
          <h1>{book.title !== undefined && book.title}</h1>
          {/* TODO: Test the preliminary code below! */}
          <hr />
          <p>
            <strong>Author(s): </strong>
            {
              // Builds the list of authors to display to user
              // odd code, untested, praying it somewhat works
              book.authors.map((author) => {
                if (author !== book.authors[book.authors.length - 1]) {
                  return `${author},`;
                }
                return author;
              })
            }
          </p>
          <p>
            <strong>Genre(s): </strong>
            {
              // Builds the list of genres to display to user
              // odd code, untested, praying it somewhat works
              book.genres.map((genre) => {
                if (genre !== book.genres[book.genres.length - 1]) {
                  return `${genre},`;
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
      </>
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
