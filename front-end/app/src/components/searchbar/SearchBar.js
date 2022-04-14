import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import BookCard from "../book-card/BookCard";
import BookPage from "../../pages/book-page/BookPage";
import "./searchbar.css";

export default function SearchBar({
  username,
  searchQuery,
  setQuery,
  showSearch,
  setSearchPage,
}) {
  const URL = "https://husky-reads.herokuapp.com";
  const SEARCH_ENDPOINT = "/books/search/";
  const [category, setCategory] = useState("");
  const [display, setDisplay] = useState([]);
  const [selectedISBN, setISBN] = useState();
  const [openPage, setOpen] = useState(false);
  const [pageClass, setPageClass] = useState("bookpage-modal ");
  const [bgClass, setBgClass] = useState("bookpage-bg ");
  const [shelfStatus, setShelfStatus] = useState("");
  const handleClick = useCallback(
    (isbn) => {
      setOpen(!openPage);
      setISBN(isbn);
    },
    [openPage]
  );
  const searchInput = useRef();
  const searchSelect = useRef();

  async function loadEndpoint(endpoint) {
    try {
      const BOOKSEARCH = await axios.get(endpoint);
      if (BOOKSEARCH.error === undefined) {
        console.log(BOOKSEARCH.data.books);
        setDisplay(BOOKSEARCH.data.books);
      } else {
        console.log(BOOKSEARCH.error);
      }
    } catch (err) {
      console.log(err.toString());
    }
  }

  useEffect(() => {
    if (category) {
      loadEndpoint(URL + SEARCH_ENDPOINT + "?" + category + "=" + searchQuery);
    } else {
      loadEndpoint(URL + SEARCH_ENDPOINT + "?title=" + searchQuery);
    }

    searchInput.current.value = searchQuery
  }, [searchQuery]);

  return (
    <section className={showSearch}>
      <button
        onClick={() => {
          setSearchPage("search-overlay hidden");
          setQuery("");
          setCategory("");
          searchInput.current.value = "";
          searchSelect.current.value = "";
        }}
      >
        Exit Search
      </button>
      <select
        onChange={(e) => setCategory(e.target.value)}
        name="categories"
        id="category-select"
        ref={searchSelect}
      >
        <option value="">Select Category</option>
        <option value="author">Author</option>
        <option value="title">Book Title</option>
        <option value="genre">Book Genre</option>
      </select>
      <input
        ref={searchInput}
        placeholder="Search All Books"
        className="search-input"
        type={"text"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setQuery(e.target.value);
          }
        }}
      ></input>
      <button
        className="nav_search-btn"
        onClick={() => {
          setQuery(searchInput.current.value);
        }}
        title="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <div className="bookstand-list">
        {display.map((book) => {
          return (
            <BookCard
              key={book.isbn}
              img={
                "https://covers.openlibrary.org/b/isbn/" +
                book.isbn +
                "-M.jpg?default=false"
              }
              title={book.title}
              authors={book.authors}
              isbn={book.isbn}
              handleClick={handleClick}
            />
          );
        })}
      </div>
      <div
        className={bgClass}
        onClick={() => {
          setOpen(false);
          setShelfStatus("");
        }}
      ></div>
      <div className={pageClass}>
        <BookPage
          isbn={selectedISBN}
          openPage={openPage}
          setPageClass={setPageClass}
          setBgClass={setBgClass}
          username={username}
          shelfStatus={shelfStatus}
          setShelfStatus={setShelfStatus}
        />
      </div>
    </section>
  );
}
