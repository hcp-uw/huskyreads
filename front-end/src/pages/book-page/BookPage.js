import "./style.css";

export default function BookPage(detailedBookData) {
    return(
      <div id="bookpage-container">
        <div id="left-column">
          <div id="imagebox"></div>
          <select id="selector">
            <option class="opt"></option>
            <option class="opt">Plan to Read</option>
            <option class="opt">Currently Reading</option>
            <option class="opt">Finished</option>
          </select>
        </div>

        <div id="right-column">
          <h1>{detailedBookData.title} Lol</h1>
          <hr />
          <p><strong>Author(s): </strong>{detailedBookData.authors}</p>
          <p><strong>Genre(s): </strong>{detailedBookData.genres}</p>
          <p><strong>Description:</strong></p>
          <p>{detailedBookData.description}</p>
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