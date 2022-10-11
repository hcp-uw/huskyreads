import './index.css';
import Login from "./pages/login/Login";
import axios from "axios";
import { useEffect } from "react";

export default function App() {

  const URL = "https://husky-reads.herokuapp.com";

  useEffect(() => {
    async function bootUpHeroku() {
      await axios
        .get(URL + "/test")
        .catch(function (error) {
          console.log(error.toString());
        });
    }

    bootUpHeroku();
  }, []);

  return (
    <>
      <Login/>
      <footer>&copy; Husky Coding Project 2022</footer>
    </>
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