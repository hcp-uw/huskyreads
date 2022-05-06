import { useCallback, useEffect, useState } from "react";
import BookCard from "../../components/book-card/BookCard";
import BookPage from "../book-page/BookPage";
import "./index.css";
import axios from "axios";

export default function HomePage(props) {
  const [browseData, setData] = useState();
  const [selectedISBN, setISBN] = useState(1111111111);
  const [openPage, setOpen] = useState(false);
  const [featured, setFeatured] = useState();
  const [pageClass, setPageClass] = useState("bookpage-modal ");
  const [bgClass, setBgClass] = useState("bookpage-bg ");
  const [shelfStatus, setShelfStatus] = useState("");
  const handleClick = useCallback((isbn) => {
    setOpen(!openPage);
    setISBN(isbn);
  }, [openPage])

  const URL = "https://husky-reads.herokuapp.com";

  useEffect(() => {
    async function getData() {
      await axios
        .get(URL + "/books/search")
        .then(({ data }) => {
          setData(data.books);
        })
        .catch(function (error) {
          console.log(error.toString());
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

  return (
    <div className="browse-container">
      {browseData !== undefined && (
        <div>
          <Featured featured={featured} handleClick={handleClick} />
          <Browse data={browseData} handleClick={handleClick} />
        </div>
      )}
      <div className={bgClass} onClick={() => {setOpen(false); setShelfStatus("");}}></div>
      <div className={pageClass}>
        <BookPage
          isbn={selectedISBN}
          openPage={openPage}
          setPageClass={setPageClass}
          setBgClass={setBgClass}
          username={props.username}
          shelfStatus={shelfStatus}
          setShelfStatus={setShelfStatus}
        />
      </div>
    </div>
  );
}

const Featured = ({ featured, handleClick }) => {
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
  } else {
    return <div></div>
  }
};