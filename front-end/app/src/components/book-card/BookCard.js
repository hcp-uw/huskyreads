import './index.css';

export default function BookCard({img, title, authors, isbn}) {
  return (
    <a id={isbn} className="book-list_card" href="/">
      <img className="book-card_img" src={img} alt={title}/>
      <h4 className="book-card_title">{title}</h4>
      <p className="book-card_author">{authors}</p>
    </a>
  );
}