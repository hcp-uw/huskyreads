import "./style.css";
import axios from 'axios'
import React, {useState, useEffect} from 'react';

export default function BookPage(isbn) {

  /*
  Sample book JSON for detailed info on a book, given an ISBN
  {
    "title": "Hunger Games",
    "authors": ["Suzanne Collins"],
    "genres": ["Young Adult", "Dystopian"],
    "datePublished": "2012-12-20",
    "description": "Katniss Everdeen fights the distopian government"
  }
  */

  const [book, setBook] = useState({
    title: "",
    authors: [],
    genres: [],
    datePublished: "",
    description: ""
  });

  // calls the the book constructor ONCE! The [] at the end of useEffect helps
  // with that
  useEffect(() => {
    getBookData(isbn);
  }, []);

  // book fetch and constructor
  async function getBookData(isbnParam) {
    // expecting this base URL to change btw!!
    let fetchURL = "http://localhost:8000/books/detail/";

    if (isbnParam !== undefined) {
      // testing ISBN
      fetchURL += "11111111111";
      // supposed to be the line below, but we're using 11111111111 for testing purposes.
      // fetchURL += `${isbnParam}`;
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
            <option className="opt" value="want_to_read">Plan to Read</option>
            <option className="opt" value="reading">Currently Reading</option>
            <option className="opt" value="read">Finished</option>
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
              // is this the last author of the author list? Then print w/o comma.
              if (book.authors.indexOf(author) === book.authors.length - 1) {
                return author;
              }
              return `${author}, `;
            })
          }
        </p>
        <p>
          <strong>Genre(s): </strong>
          {
            // Builds the list of genres to display to user
            // odd code, untested, praying it somewhat works
            book.genres.map((genre) => {
              // is this the last genre of the genre list? Then print w/o comma.
              if (book.genres.indexOf(genre) === book.genres.length - 1) {
                return genre;
              }
              return `${genre},`;
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
