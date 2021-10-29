import React, { useState, useEffect } from 'react';

export default function BookStandPage() {

  const [bookStand, setBookStand] = useState({/* needs setup */});

  // plan: get the username from the client by getting it from their cookie
  // with "http://localhost:8000/grab/username". Using that username, we get
  // the bookshelves via bookshelves/get/:username/:(optional)bookshelf,
  // which returns a list of 3 objects, one object per shelf type
  // implement the scroll function used in the browse page and use the BookCard
  // set up by Audrey to describe each shelf.

  return (
    <div>Book stand</div>
  );
}

