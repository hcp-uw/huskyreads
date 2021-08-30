import BookCard from "../../components/book-card/BookCard";
import './index.css';

export default function HomePage() {
  return (
    <div className="browse-container">
      <Featured/>
      <Browse/>
    </div>
  );
}

const Featured = () => {
  const sampleArray = [];
  for (let i = 0; i < 20; i++) {
    sampleArray.push(<BookCard title="The Very Hungry Caterpillar" img="images/sample.png" author="Eric Carle"/>);
  }
  return (
    <section className="homepage-featured">
      <h2>Featured Books</h2>
      <div className="browse_book-list">
        {
          sampleArray.map(card => {
            return card;
          })
        }
      </div>
    </section>
  );
}

const Browse = () => {
  const sampleArray = [];
  for (let i = 0; i < 20; i++) {
    sampleArray.push(<BookCard title="The Very Hungry Caterpillar" img="images/sample.png" author="Eric Carle"/>);
  }
  return (
    <section className="homepage-browse">
      <h2>Browse</h2>
      <div className="browse_book-list">
        {
          sampleArray.map(card => {
            return card;
          })
        }
      </div>
    </section>
  );
}