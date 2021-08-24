import "./style.css";

export default function BookStandPage(detailedBookData) {
  
    return(
      <div id="container">
        <div id="left-column">
          <div id="imagebox"></div>
          <select>
            <option></option>
            <option>Plan to Read</option>
            <option>Currently Reading</option>
            <option>Finished</option>
          </select>

        </div>
        <div id="right-column">
          <h1>{detailedBookData.title}</h1>
          <p><strong>Author(s): </strong>{detailedBookData.authors}</p>
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