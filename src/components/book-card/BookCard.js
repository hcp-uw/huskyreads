import './index.css';

export default function BookCard({img, title, author}) {
  return (
    <div className="book-list_card">
      <a href="/browse">
        <img className="book-list_img" src={img} alt={title}/>
        <h4 className="book-list_title">{title}</h4>
        <p className="book-list_author">{author}</p>
      </a>
    </div>
  );
}