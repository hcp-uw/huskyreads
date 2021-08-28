import './index.css';

export default function BookCard({img, title, author}) {
  return (
    <a className="book-list_card" href="/browse">
      <img className="book-card_img" src={img} alt={title}/>
      <h4 className="book-card_title">{title}</h4>
      <p className="book-card_author">{author}</p>
    </a>
  );
}