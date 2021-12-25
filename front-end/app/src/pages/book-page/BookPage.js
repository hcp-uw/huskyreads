import "./style.css";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Form from '../login/Form';

export default function BookPage(isbn) {

  const URL = "localhost:";
  const PORT = 8000;
  // expecting this base URL to change btw!!
  let errorPage = false;

  // I instantiated the object initially to withstand any potential errors
  // that could be thrown.
  const [book, setBook] = useState({
    title: "",
    authors: [],
    genres: [],
    datePublished: "",
    description: "",
  });

  // calls the the book constructor
  async function axiosCall() {
    const GET_BOOK = "/books/detail/";
    try {
      if (isbn === undefined || isbn.isNaN()) {
        errorPage = true;
      } else {
        let fetchURL = URL + PORT + GET_BOOK + isbn;
        let bookData = await axios.get(fetchURL);
        setBook(bookData.data);
      }
    } catch (err) {
      console.log(err);
      errorPage = true;
    }
  }

  useEffect(() => {
    axiosCall();
  }, []);


  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.statusText);
    }
    return res;
  }

  if (errorPage) {
    return (
      <p>Error! Check console!</p>
    )
  } else {
    return(
      <main id="bookpage-container">
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
        </section>
      </main>
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
