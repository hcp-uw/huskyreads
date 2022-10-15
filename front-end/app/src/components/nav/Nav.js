import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import './nav.css';

export default function Navbar({username, logoutFunction}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = (open) => {setOpen(open)};
  const [searchQuery, setQuery] = useState("");
  const [showSearch, setSearchPage] = useState("search-overlay hidden");
  const [searchClick, clickTrigger] = useState(false);
  const searchbox = useRef();

  return (
    <div className="navigation-wrapper">
      <nav className="navigation-bar">
        <NavLink to="/">
          <h1 className="nav-logo">HuskyReads</h1>
        </NavLink>
        <div className="nav_split-right">
          <button className="nav_menu-btn" onClick={() => {toggleOpen(!open)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <ul className="nav-links lg">
            <li>
              <NavLink to="/" exact>Browse</NavLink>
            </li>
            <li>
              <NavLink to="/bookstand" activeClassName="active">Book Stand</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">About Us</NavLink>
            </li>
          </ul>
          <input
            ref={searchbox}
            className='nav-search-input'
            type={"text"}
            placeholder="Search All Books"
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                setSearchPage("search-overlay");
                setQuery(searchbox.current.value);
                clickTrigger(!searchClick);
                searchbox.current.value = "";
              }
            }}
          ></input>
          <button className="nav_search-btn" onClick={() => {
            setQuery(searchbox.current.value);
            clickTrigger(!searchClick);
            setSearchPage("search-overlay");
            searchbox.current.value = "";
          }} title="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button
            className='nav_search-btn nav_logout-btn'
            onClick={logoutFunction}
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
          </button>
        </div>
      </nav>
      <ModalNav modalOpen={open} toggle={toggleOpen}/>
      <SearchBar
        username={username}
        searchQuery={searchQuery}
        setQuery={setQuery}
        showSearch={showSearch}
        setSearchPage={setSearchPage}
        searchClick={searchClick}
        clickTrigger={clickTrigger}/>
    </div>
  );
}

export function ModalNav(props) {
  let modalClass = "nav-modal ";

  if (!props.modalOpen) {
    modalClass = modalClass + "hidden";
  }

  return (
    <div className={modalClass}>
      <div className="modal-bg" onClick={()=>{props.toggle(false)}}/>
      <div className="nav_modal-window">
        <ul className="nav-links sm">
          <li>
            <NavLink to="/" onClick={()=>{props.toggle(false)}}>Browse</NavLink>
          </li>
          <li>
            <NavLink to="/bookstand" activeClassName="active" onClick={()=>{props.toggle(false)}}>Book Stand</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active" onClick={()=>{props.toggle(false)}}>About Us</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}