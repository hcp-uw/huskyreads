import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/nav/Nav";
import './index.css';
import AboutPage from "./pages/about/About";
import BookStandPage from "./pages/book-stand/BookStand";
import HomePage from "./pages/home/Home";
import LoginPage from "./pages/login/Login";
import SettingsPage from "./pages/settings/Settings";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/bookstand">
          <BookStandPage/>
        </Route>
        <Route path="/settings">
          <SettingsPage/>
        </Route>
        <Route path="/about">
          <AboutPage/>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/browse">
          <HomePage/>
        </Route>
        <Redirect to="/browse"/>
      </Switch>
    </Router>
  );
}

// hello! this is the root file and the App() component is basically what gets
// rendered in index.html file. I've created a basic file structure to start with
// but please add new folders/files or change things anywhere if needed!
// (some pages have some content because i was testing the navbar)

// Main folders you need to know about:
// - src/pages: where individual pages in our website goes (usually a folder
//   containing a .js and .css file)
// - src/components: where we put components that are imported & used in multiple pages
// - public: where assets go (like images, files, font files, etc)

// To do a browser preview, just type "npm start" into command line and it'll
// automatically pull up the site in your browser & will also auto update as
// you code!!

// Shoot me a message through discord if you have questions! -audrey :)