var global = require('../global_utils');
var server = global.server;
var chai = global.chai;

initialize = async (done) => {
  let user1 = {
      username: "elliot",
      password: "pass1"
  }
  let user2 = {
      username: "frank",
      password: "pass2"
  }
  let user3 = {
      username: "vikram",
      password: "pass1"
  }
  await global.resetDB(() => {});
  await chai.request(server).post('/signup').send(user1);
  await chai.request(server).post('/signup').send(user2);
  await chai.request(server).post('/signup').send(user3);
  done();
}


describe('POST /bookshelves/add', function() {
  before(function(done) {
    initialize(done);
  });

  /*************************************
   * Adding books to empty shelves
   ***********************************/
  it('200: adding a book to empty reading shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "reading",
      isbn: 1111111111,
    }
    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  it('200: adding a book to an empty read shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "reading",
      isbn: 2222222222,
    }
    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  it('200: adding a book to empty want_to_read shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "want_to_read",
      isbn: 3333333333,
    }
    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  /*************************************
   * Adding books to non-empty shelves
   ***********************************/
  it('200: adding a book to non-empty reading bookshelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "reading",
      isbn: 4444444444,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  it('200: adding a book to non-empty read bookshelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "read",
      isbn: 5555555555,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  it('200: adding a book to non-empty want_to_read bookshelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "want_to_read",
      isbn: 6666666666,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  /*************************************
   * Adding duplicate books to shelves
   ***********************************/
  it('400: adding duplicate book into the same reading shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "reading",
      isbn: 1111111111,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Book already exists in reading");
      done();
    });
  });

  it('200: adding duplicate book into the same read shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "read",
      isbn: 2222222222,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Book already exists in read");
      done();
    });
  });

  it('200: adding duplicate book into the same read shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "want_to_read",
      isbn: 3333333333,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Book already exists in want_to_read");
      done();
    });
  });

  it('200: adding duplicate book from reading shelf into the read shelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "read",
      isbn: 1111111111,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.equal("Book successfully added to the bookshelf");
      done();
    });
  });

  /*************************************
   * Missing one or more required body parameters
   ***********************************/
  it('400: Missing the ISBN body parameter', function(done) {
    let task = {
      username: "elliot",
      bookshelf: "want_to_read"
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Missing one or more required body parameters");
      done();
    });
  });

  it('400: Missing the bookshelf body parameter', function(done) {
    let task = {
      username: "frank",
      isbn: 3333333333
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Missing one or more required body parameters");
      done();
    });
  });

  it('400: Missing the username body parameter', function(done) {
    let task = {
      bookshelf: "want_to_read",
      isbn: 3333333333
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Missing one or more required body parameters");
      done();
    });
  });

  it('400: No parameters given!', function(done) {
    let task = {};
    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Missing one or more required body parameters");
      done();
    });
  });

  /*************************************
   * Invalid username testing
   ***********************************/
   it('200: Invalid username', function(done) {
    let task = {
      username: "vikram1",
      bookshelf: "read",
      isbn: 1111111111,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(401);
      res.text.should.equal("Invalid username");
      done();
    });
  });

    /*************************************
   * Invalid bookshelf testing
   ***********************************/

  it('200: Invalid bookshelf', function(done) {
    let task = {
      username: "vikram",
      bookshelf: "read--",
      isbn: 1111111111,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Invalid bookshelf name");
      done();
    });
  });

  it('200: Invalid bookshelf', function(done) {
    let task = {
      username: "frank",
      bookshelf: "read-!-",
      isbn: 1111111111,
    }

    chai.request(server)
    .post('/bookshelves/add')
    .send(task)
    .end(function(err, res) {
      res.should.have.status(400);
      res.text.should.equal("Invalid bookshelf name");
      done();
    });
  });
});