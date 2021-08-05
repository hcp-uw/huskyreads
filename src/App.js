import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}

// hello! this is the root file and the App()
// component is basically what gets rendered
// in index.html