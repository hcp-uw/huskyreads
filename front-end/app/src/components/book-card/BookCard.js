import './index.css';

export default function BookCard({img, title, authors, isbn}) {
  let authorText = "";
  let image = "";
  if (img === undefined) {
    image = "/images/default-cover.png";
  } else {
    image = img;
  }

  if (authors === undefined || authors.length === 0) {
    authorText = "Author Unknown";
  } else if (typeof(authors) == "string") {
    authorText = authors;
  } else {
    for (let i = 0; i < authors.length; i++) {
      authorText += authors[i] + ", ";
    }
    authorText = authorText.slice(0, authorText.length - 2);
  }

  return (
    <a id={isbn} className="book-list_card" href="/">
      <img className="book-card_img" src={image} alt={title}/>
      <h4 className="book-card_title">{title}</h4>
      <p className="book-card_author">{authorText}</p>
    </a>
  );
}