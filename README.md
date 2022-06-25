# Husky Reads

## About Husky Reads
The purpose of Husky Reads is to create a simpler, more straightforward web application similar
to GoodReads that allows our users to look for books to read, keep track of books previously
read, currently reading, and/or planning to read. Along with that, this project serves as a
learning experience for the members of the HuskyReads team, and builds the confidence of the members in our team to pursue future projects. This is the first project ever completed by the Husky
Coding Club and we will use the experience we've gained from this project to provide the
groundwork for future project teams to build and grow from.


## Developers

- **Project Lead:** Elliot Schumacher
- **Front-end Developers:** Vikram Nithyanandam, Audrey Kho, and Juda Fernandez
- **Back-end Developers:** Elliot Schumacher, Frank Hou, Sidharth Lakshmanan, and Nicholas Boren

<br>

---


## Configuration Instructions
1. Clone the repository and open it in your IDE, preferably VSCode.
2. Open your IDE Terminal starting at the HuskyReads directory.
3. Perform the following Terminal commands to have all node modules set up:

```
cd front-end/app
npm install
cd ../..
cd back-end/app
npm install
```

Note, the front-end is currently hosted on Heroku at https://husky-reads-front-end.herokuapp.com.

However, if you want launch the front-end on your personal machine, perform the following commands in your Terminal starting at the top project directory:

```
cd front-end/app
npm start
```

This will launch the application locally on your machine

The back-end code is hosted on Heroku. You do not need to launch it on your personal machine,
since that would require a *.db file and a MySQL setup.

More information is available under `back-end/API_Documentation`.

<br>

---

## Project File Structure


### Front-End File Structure

The `front-end` folder should contain all of the dependencies for the front-end, including
the necessary Docker files for dockerizing and hosting the front-end container. There
is supposed to be a `node_modules` folder under `front-end`, do not delete it.

The actual front-end is located under `front-end/app`. All package dependencies and
app files are located under there.
All pages for the HuskyReads application are stored under `front-end/app/src/pages`.
All components that are used across pages are under `front-end/app/src/components`.
Any pictures we use are stored under `front-end/app/public`.


### Back-End File Structure

The `back-end` folder contains the back-end code base that is currently hosted on Heroku.
For more information on the API and its endpoints, please look under
`back-end/API_Documentation`.

If you look under `back-end/app`, there are 5 folders. Here are their purposes:
- `controllers`: Contains all functions that interact with the MySQL database. These functions are called by the endpoints in the `routes` folder.
- `routes`: Contains endpoint connections that the front-end will call, using functions from
the `controllers` folder to perform the necessary operations when requested.
- `utils`: Holds sensitive info about the database metadata and status codes
- `testing`: Holds our back-end testing suite, which uses Mocha and Chai testing frameworks.
- `logs`: Where error logs are written when they occur.

<br>

---

## Other Info

Club Contact Info: huskycodingproject@gmail.com

License: Creative Commons License


