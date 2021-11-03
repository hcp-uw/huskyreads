import "./style.css";
import axios from 'axios'
import React, {useState, useEffect} from 'react';

export default function BookPage(ISBN) {

  // expecting this base URL to change btw!!
  const GRAB_COOKIE_URL = "http://localhost:8000/grab/username";
  let returnToLogin = false;
  let errorPage = false;

  // I instantiated the object initially to withstand any potential errors
  // that could be thrown.
  const [book, setBook] = useState({
    title: undefined,
    authors: undefined,
    genres: undefined,
    datePublished: undefined,
    description: undefined,
  });

  // calls the the book constructor
  useEffect(() => {
    getBookData(ISBN);
  }, []);

  // book fetch and constructor
  async function getBookData(isbnParam) {
    let fetchURL = "http://localhost:8000/books/detail/";

    // cookie check!!!
    const USERNAME = await axios.get(GRAB_COOKIE_URL)
      .then((res) => {return res.username})
      .catch((res) => console.error(res.error));

    // TODO: test if it's properly accounting for errors that can arise from this endpoint call,
    // such as cookie expiration or error codes.
    let book = undefined;
    if (USERNAME !== undefined) {
      if (isbnParam !== undefined) {
        fetchURL += `${isbnParam}`;
        book = await axios.get(fetchURL)
        .catch((res) => {
          console.error(res.error);
          return undefined;
        });
      } else {
        errorPage = true;
      }
    } else {
      returnToLogin = true;
    }

    if (book !== undefined) {
      setBook(book.data);
    }
  }

  // returns book page

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
    return(
      <div id="bookpage-container">
        <div id="left-column">
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
        </div>
        <div id="right-column">
          <h1>Title: {book.title !== undefined && book.title}</h1>
          {/* TODO: Test the preliminary code below! */}
          <hr />
          <p>
            <strong>Author(s): </strong>
            {
              // Builds the list of authors to display to user
              // odd code, untested, praying it somewhat works
              book.authors.map(author => {
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
          <p><strong>Date Published:</strong>
            {book.datePublished !== undefined && book.datePublished}</p>
          <p><strong>Description:</strong></p>
          <p>{book.description !== undefined && book.description}</p>
        </div>
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
