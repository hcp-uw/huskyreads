import "./style.css";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Form from '../login/Form';

export default function BookPage(isbn) {

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
  useEffect(async () => {
    const GET_BOOK = "/books/detail/";
    try {
      if (isbn === undefined || isbn.isNaN()) {
        errorPage = true;
      } else {
        let fetchURL = GET_BOOK + isbn;
        let res = await fetch(fetchURL);
        let check = statusCheck(res);
        let bookData = await check.json();
        setBook(bookData);
      }
    } catch (err) {
      console.log(err.error);
      errorPage = true;
    }
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
      <main>
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
