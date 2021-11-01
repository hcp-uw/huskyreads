import { useEffect, useRef } from "react";
import BookCard from "../../components/book-card/BookCard";
import './index.css';
const axios = require('axios');

export default function HomePage() {
  const browseData = useRef();

  useEffect(() => {
    async function getData() {
      await axios.get('http://localhost:8000/books/search')
      .then(({data}) => {
        browseData.current = data.books;
      })
      .catch(function(error) {
        console.log(error);
      })
    }

    getData();
  }, []);

  return (
    <div className="browse-container">
      <Featured data={browseData.current}/>
      <Browse data={browseData.current}/>
    </div>
  );
}

const Featured = ({data}, ...props) => {
  const books = [];

  const shuffled = data.slice().sort(() => 0.2 - Math.random());
  let featured = shuffled.slice(0, 3);

  for (let i = 0; i < featured.length; i++) {
    if (data[i].cover) {
      books.push(<BookCard title={featured[i].title} img={featured[i].cover} authors={featured[i].authors} isbn={featured[i].isbn}/>);
    } else {
      books.push(<BookCard title={featured[i].title} img="images/default-cover.png" authors={featured[i].authors} isbn={featured[i].isbn}/>);
    }
  }
  return (
    <section className="homepage-featured">
      <h2>Featured Books</h2>
      <div className="browse_book-list">
        {
          books.map(card => {
            return card;
          })
        }
      </div>
    </section>
  );
}

const Browse = ({data}, ...props) => {
  const books = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].cover) {
      books.push(<BookCard title={data[i].title} img={data[i].cover} authors={data[i].authors} isbn={data[i].isbn}/>);
    } else {
      books.push(<BookCard title={data[i].title} img="images/default-cover.png" authors={data[i].authors} isbn={data[i].isbn}/>);
    }
  }
  return (
    <section className="homepage-browse">
      <h2>Browse</h2>
      <div className="browse_book-list">
        {
          books.map(card => {
            return card;
          })
        }
      </div>
    </section>
  );
}