import "./index.css";
import { Container, Card, Box } from '@material-ui/core';

export default function AboutPage() {
  const testing = false;
  if (!testing) {
    return(pureHTML());
  } else {
    
    return(
      <div id="container">  
          <div id="about-block">
              <img src={process.env.PUBLIC_URL + "/images/huskypic.jpeg"} alt="husky pic" /> 
              <div id="purpose-box">
                  <p id="page-title"> About Husky Reads </p>
                  <p id="purpose-text">
                      The purpose of Husky Reads to create a simpler, more straightforward web application similar
                      to GoodReads that allows our users to look for books to read, keep track of books previously
                      read, currently reading, and/or planning to read. Along with that, this project serves as a
                      learning experience for the members of the HuskyReads team, and build confidence in the members
                      of our team to pursue future projects. This is the first project ever completed by the Husky
                      Coding Club and we will use the experience we've gained from this project to provide the 
                      groundwork for future project teams to build and grow from.
                  </p>
              </div>
          </div>
          <p id="team-title"> Our Team </p>
          <div id="member-list">
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic"
                       className="member-pic" />
                  <h3>Vikram Nithyanandam</h3>
                  <p className="membertext">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic" 
                       className="member-pic" />
                  <h3>Juda Fernandez</h3>
                  <p className="membertext">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"}
                       alt="pic" 
                       className="member-pic" />
                  <h3>Audrey Kho</h3>
                  <p className="membertext">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic" 
                       className="member-pic" />
                  <h3>Sriram Thothathri</h3>
                  <p className="membertext"> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"}
                       alt="pic" 
                       className="member-pic" />
                  <h3>Elliot Schumacher</h3>
                  <p className="membertext"> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic" 
                       className="member-pic" />
                  <h3>Frank Hou</h3>
                  <p className="membertext"> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div> 
          </div>
      </div>  
    );
  }

}












function pureHTML() {
  return (
    <div id="container">
          <div id="about-block">
              <img src={process.env.PUBLIC_URL + "/images/huskypic.jpeg"} alt="husky pic" /> 
              <div id="purpose-box">
                  <p id="page-title"> About Husky Reads </p>
                  <p id="purpose-text">
                      The purpose of Husky Reads to create a simpler, more straightforward web application similar
                      to GoodReads that allows our users to look for books to read, keep track of books previously
                      read, currently reading, and/or planning to read. Along with that, this project serves as a
                      learning experience for the members of the HuskyReads team, and build confidence in the members
                      of our team to pursue future projects. This is the first project ever completed by the Husky
                      Coding Club and we will use the experience we've gained from this project to provide the 
                      groundwork for future project teams to build and grow from.
                  </p>
              </div>
          </div>
          <p id="team-title"> Our Team </p>
          <div id="member-list">
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic"
                       className="member-pic" />
                  <h3>Vikram Nithyanandam</h3>
                  <p className="membertext">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic" 
                       className="member-pic" />
                  <h3>Juda Fernandez</h3>
                  <p className="membertext">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"}
                       alt="pic" 
                       className="member-pic" />
                  <h3>Audrey Kho</h3>
                  <p className="membertext">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic" 
                       className="member-pic" />
                  <h3>Sriram Thothathri</h3>
                  <p className="membertext"> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"}
                       alt="pic" 
                       className="member-pic" />
                  <h3>Elliot Schumacher</h3>
                  <p className="membertext"> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
              <div className="member-box">
                  <img src={process.env.PUBLIC_URL + "/images/cutepfp.png"} 
                       alt="pic" 
                       className="member-pic" />
                  <h3>Frank Hou</h3>
                  <p className="membertext"> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div> 
          </div>
      </div>   
  )
}
