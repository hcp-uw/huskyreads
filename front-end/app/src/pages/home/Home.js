import { useCallback, useEffect, useState } from "react";
import BookCard from "../../components/book-card/BookCard";
import BookPage from "../book-page/BookPage";
import "./index.css";
const axios = require("axios");

export default function HomePage() {
  const [browseData, setData] = useState();
  const [selectedISBN, setISBN] = useState(1111111111);
  const [openPage, setOpen] = useState(false);
  const [featured, setFeatured] = useState();
  const handleClick = useCallback((isbn) => {
    setOpen(!openPage);
    setISBN(isbn);
  }, [openPage])

  let pageClass = "browse-bookpage-modal ";
  let bgClass = "browse-bookpage-bg ";

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

  useEffect(() => {
    if (browseData !== undefined) {
      const shuffled = browseData.slice().sort(() => 0.2 - Math.random());
      setFeatured(shuffled.slice(0, 3));
    }
  }, [browseData]);

  if (!openPage) {
    pageClass += "hidden";
    bgClass += "hidden";
  }

  return (
    <div className="browse-container">
      {browseData !== undefined && (
        <div>
          <Featured featured={featured} handleClick={handleClick} />
          <Browse data={browseData} handleClick={handleClick} />
        </div>
      )}
      <div className={bgClass} onClick={() => {setOpen(false)}}></div>
      <div className={pageClass}>
        <BookPage isbn={selectedISBN} />
      </div>
    </div>
  );
}

const Featured = ({ featured, handleClick }) => {
  console.log("hi")

  if (featured !== undefined) {
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
                handleClick={handleClick}
              />
            );
          })}
        </div>
      </section>
    );
  } else {
    return <div></div>
  }
};

const Browse = ({ data, handleClick }) => {
  console.log("browse")
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
                handleClick={handleClick}
              />
            );
          })}
        </div>
      </section>
    );
  }
};
