import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleOpen = (open) => {setOpen(open)};

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
              <NavLink to="/settings" activeClassName="active">Settings</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">About Us</NavLink>
            </li>
            {/* remove this line below later
            <li>
              <NavLink to="/book-page" activeClassName="active">Book Page Test</NavLink>
            </li>
            */}
          </ul>
          <button className="nav_search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </nav>
      <ModalNav modalOpen={open} toggle={toggleOpen}/>
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
            <NavLink to="/settings" activeClassName="active" onClick={()=>{props.toggle(false)}}>Settings</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active" onClick={()=>{props.toggle(false)}}>About Us</NavLink>
          </li>
          {/* remove this line below later
          <li>
            <NavLink to="/book-page" activeClassName="active">Book Page Test</NavLink>
          </li>
          */}
        </ul>
      </div>
    </div>
  );
}