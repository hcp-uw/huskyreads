import "./index.css";
import { useRef } from "react";

export default function BookCard({ img, title, authors, isbn }) {
  let authorText = "";
  let ref = useRef(null);

  if (authors === undefined || authors.length === 0) {
    authorText = "Author Unknown";
  } else if (typeof authors == "string") {
    authorText = authors;
  } else {
    for (let i = 0; i < authors.length; i++) {
      authorText += authors[i] + ", ";
    }
    authorText = authorText.slice(0, authorText.length - 2);
  }

  return (
    <a id={isbn} className="book-list_card" href="/">
      <img
        ref={ref}
        className="book-card_img"
        src={img}
        onError={() => {
          ref.current.src = "images/default-cover.png";
        }}
        alt={title}
      />
      <h4 className="book-card_title">{title}</h4>
      <p className="book-card_author">{authorText}</p>
    </a>
  );
}
