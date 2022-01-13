import React, { useState, useEffect } from 'react';
import "./searchbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  InputGroup,
  Input,
  Button
} from 'reactstrap';


export default function SearchBar( { handleSearch } ) {

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  return (
    <>
      <InputGroup className='w-50 m-2' id="input-group">
        <div className='col-xs-2'>
          <Input
            type='select'
            name='select'
            id='categories'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Categories</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Input>
        </div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          id="bar"
        />
        <Button
          className="bi bi-search"
          id="search-button"
          onClick={() => handleSearch(search, category)}>
        </Button>
      </InputGroup>
    </>
  );
}
