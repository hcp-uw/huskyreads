import { useEffect, useState } from "react";
import BookCard from "../../components/book-card/BookCard";
import "./index.css";
const axios = require("axios");

export default function HomePage() {
  const [browseData, setData] = useState();

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

  return (
    <div className="browse-container">
      {browseData !== undefined && (
        <div>
          <Featured data={browseData} />
          <Browse data={browseData} />
        </div>
      )}
    </div>
  );
}

const Featured = ({ data }, ...props) => {
  const books = [];

  let featured = data;
  if (data) {
    const shuffled = data.slice().sort(() => 0.2 - Math.random());
    featured = shuffled.slice(0, 3);
  }

  if (featured !== undefined) {
    for (let i = 0; i < featured.length; i++) {
      books.push(
        <BookCard
          title={featured[i].title}
          img={
            "https://covers.openlibrary.org/b/isbn/" +
            featured[i].isbn +
            "-M.jpg?default=false"
          }
          authors={featured[i].authors}
          isbn={featured[i].isbn}
          key={featured[i].isbn}
        />
      );
    }
  }
  return (
    <section className="homepage-featured">
      <h3 style={{ fontSize: "1.38em" }}>Featured Books</h3>
      <div className="browse_book-list">
        {books.map((card) => {
          return card;
        })}
      </div>
    </section>
  );
};

const Browse = ({ data, covers }, ...props) => {
  const books = [];
  if (data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      books.push(
        <BookCard
          title={data[i].title}
          img={
            "https://covers.openlibrary.org/b/isbn/" +
            data[i].isbn +
            "-M.jpg?default=false"
          }
          authors={data[i].authors}
          isbn={data[i].isbn}
          key={data[i].isbn}
        />
      );
    }
  }

  return (
    <section className="homepage-browse">
      <h3 style={{ fontSize: "1.38em" }}>Browse</h3>
      <div className="browse_book-list">
        {books.map((card) => {
          return card;
        })}
      </div>
    </section>
  );
};
