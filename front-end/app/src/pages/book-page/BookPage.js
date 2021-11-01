import "./style.css";
import axios from 'axios'
import React, {useState, useEffect} from 'react';

export default function BookPage(ISBN) {

  // I instantiated the object initially to withstand any potential errors
  // that could be thrown.
  const [book, setBook] = useState({
    title: undefined,
    authors: undefined,
    genres: undefined,
    datePublished: undefined,
    description: undefined
  });

  // calls the the book constructor
  useEffect(() => {
    getBookData(ISBN);
  }, [ISBN]);

  // book fetch and constructor
  async function getBookData(isbnParam) {
    // expecting this base URL to change btw!!
    let fetchURL = "http://localhost:8000/books/detail/";

    if (isbnParam !== undefined) {
      fetchURL += `${isbnParam}`;
    }

    const response = await axios.get(fetchURL).catch((error) => console.log(error));
    if (response !== undefined) {
      setBook(response.data);
    }
  }

  // returns book page
  return(
    <div id="bookpage-container">
      <div id="left-column">
        <div id="imagebox"></div>
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


/*   reminder from api doc that bookdata will come as
  {
    "title": "Hunger Games",
    "authors": ["Suzanne Collins"],
    "genres": ["Young Adult", "Dystopian"],
    "datePublished": "2012-12-20",
    "description": "Katniss Everdeen fights the distopian government"
  }
*/
