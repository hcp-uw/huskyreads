import {NavLink} from 'react-router-dom';
import './nav.css';

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <h1>HuskyReads</h1>
      </NavLink>
      <div className="split-right">
        <ul>
          <li>
            <NavLink to="/">Browse</NavLink>
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
        </ul>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
    </nav>
  );
}