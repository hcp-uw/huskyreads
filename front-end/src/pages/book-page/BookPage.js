import "./style.css";
import axios from 'axios'

export default async function BookPage(isbn) {
    
    getBook = async (num) => {
      const response = await axios.get("localhost:8000/books/detail/" + num).catch((err) => console.log(err));
      return response.data;
    }
    
    let book = await getBook("1111111111");
    
    return(
    
      <div id="bookpage-container">
        <div id="left-column">
          <div id="imagebox"></div>
          <div id="bookstand-selectors">
            <select id="selector">
              <option class="opt">Choose Shelf</option>
              <option class="opt">Plan to Read</option>
              <option class="opt">Currently Reading</option>
              <option class="opt">Finished</option>
            </select>
            <button id="add-button">ADD TO BOOKSTAND</button>
          </div>
        </div>

        <div id="right-column">
          <h1>{book.title} Lol</h1>
          <hr />
          <p><strong>Author(s): </strong>{book.authors}</p>
          <p><strong>Genre(s): </strong>{book.genres}</p>
          <p><strong>Description:</strong></p>
          <p>{book.description}</p>
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


