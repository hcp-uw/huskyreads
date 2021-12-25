import { useEffect, useState } from "react";
import BookCard from "../../components/book-card/BookCard";
import BookPage from "../book-page/BookPage";
import "./index.css";
const axios = require("axios");

export default function HomePage() {
  const [browseData, setData] = useState();
  const [selectedISBN, setISBN] = useState(1111111111);
  const [openPage, setOpen] = useState(false);
  let pageClass = "bookpage-modal ";

  const toggleOpen = () => {
    setOpen(!openPage);
  }

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:8000/books/search")
        .then(({ data }) => {
          setData(data.books);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getData();
  }, []);

  if (!openPage) {
    pageClass += "hidden";
  }

  console.log(selectedISBN)

  return (
    <div className="browse-container">
      {browseData !== undefined && (
        <div>
          <Featured data={browseData} toggleOpen={toggleOpen} setISBN={setISBN} />
          <Browse data={browseData} toggleOpen={toggleOpen} setISBN={setISBN} />
        </div>
      )}
      <div className={pageClass}>
        <BookPage isbn={selectedISBN} />
      </div>
    </div>
  );
}

const Featured = ({ data, toggleOpen, setISBN }) => {
  let featured = data;
  if (featured) {
    const shuffled = data.slice().sort(() => 0.2 - Math.random());
    featured = shuffled.slice(0, 3);

    return (
      <section className="homepage-featured">
        <h3 style={{ fontSize: "1.38em" }}>Featured Books</h3>
        <div className="browse_book-list">
          {featured.map((book) => {
            return (
              <BookCard
                title={book.title}
                img={
                  "https://covers.openlibrary.org/b/isbn/" +
                  book.isbn +
                  "-M.jpg?default=false"
                }
                authors={book.authors}
                isbn={book.isbn}
                key={book.isbn}
                toggleOpen={toggleOpen}
                setISBN={setISBN}
              />
            );
          })}
        </div>
      </section>
    );
  }
};

const Browse = ({ data, toggleOpen, setISBN }) => {
  if (data) {
    return (
      <section className="homepage-browse">
        <h3 style={{ fontSize: "1.38em" }}>Browse</h3>
        <div className="browse_book-list">
          {data.map(book => {
            return (
              <BookCard
                title={book.title}
                img={
                  "https://covers.openlibrary.org/b/isbn/" +
                  book.isbn +
                  "-M.jpg?default=false"
                }
                authors={book.authors}
                isbn={book.isbn}
                key={book.isbn}
                toggleOpen={toggleOpen}
                setISBN={setISBN}
              />
            );
          })}
        </div>
      </section>
    );
  }
};
