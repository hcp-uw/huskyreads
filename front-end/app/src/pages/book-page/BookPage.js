import "./style.css";
import axios from 'axios'
import React, {useState, useEffect} from 'react';

export default function BookPage(ISBN) {
    
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState([]);
    
  useEffect(() => {
    getBookData(ISBN);
  }, []);
    
  async function getBookData(isbnParam) {
    // expecting this base URL to change
    let fetchURL = "http://localhost:8000/books/detail/";
  
    if (isbn !== undefined) {
      fetchURL += `${isbnParam}`;
    }

    const response = await axios.get(fetchURL).catch((error) => console.log(error));
    
    setTitle(response.data.title);
    setAuthors(response.data.authors);
    setGenres(response.data.genres);
    setDate(response.data.datePublished);
    setDescription(response.data.description);
  }

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
        <h1>Title: {title}</h1>
        {/* TODO: The code for inserting these parameters are incorrect and will paste before
        fully loading. Need to fix that. Reference the testing folder code. */}
        <hr />
        <p><strong>Author(s): </strong>{authors}</p>
        <p><strong>Genre(s): </strong>{genres}</p>
        <p><strong>Date Published:</strong>{date}</p>
        <p><strong>Description:</strong></p>
        <p>{description}</p>
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
