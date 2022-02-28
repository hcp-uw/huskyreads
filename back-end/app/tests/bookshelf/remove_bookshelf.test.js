var global = require('../global_utils');
var server = global.server;
var chai = global.chai;

initialize = async (done) => {
  let user1 = {
      username: "elliot",
      password: "pass1"
  }
  let task = {
    username: "elliot",
    bookshelf: "reading",
    isbn: 1111111111,
  }
  let task1 = {
    username: "elliot",
    bookshelf: "reading",
    isbn: 2222222222,
  }
  let task2 = {
    username: "elliot",
    bookshelf: "read",
    isbn: 1111111111,
  }
  await global.resetDB(() => {});
  await chai.request(server).post('/signup').send(user1);
  await chai.request(server).post('/bookshelves/add').send(task);
  await chai.request(server).post('/bookshelves/add').send(task1);
  await chai.request(server).post('/bookshelves/add').send(task2);
  done();
}


describe('POST /bookshelves/remove', function() {
  before(function(done) {
    initialize(done);
  });

  it('200: delete valid book', function(done) {
    let task = {
        username: "elliot",
        bookshelf: "reading",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.be.eql("Book successfully removed from the bookshelf");
      done();
    });
  });

  it('400: delete non-existent book', function(done) {
    let task = {
        username: "elliot",
        bookshelf: "reading",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(400);
        res.text.should.be.eql("Book does not exist in reading");
      done();
    });
  });

  it('400: delete from empty shelf', function(done) {
    let task = {
        username: "elliot",
        bookshelf: "want_to_read",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(400);
        res.text.should.be.eql("Book does not exist in want_to_read");
      done();
    });
  });

  it('400: invalid bookshelf name', function(done) {
    let task = {
        username: "elliot",
        bookshelf: "want_to_readfjdijfijdijf",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(400);
        res.text.should.be.eql("Invalid bookshelf name");
      done();
    });
  });

  it('401: invalid username', function(done) {
    let task = {
        username: "sid",
        bookshelf: "want_to_read",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(401);
        res.text.should.be.eql("Invalid username");
      done();
    });
  });

  it('400: missing username', function(done) {
    let task = {
        bookshelf: "want_to_read",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(400);
        res.text.should.be.eql("Missing one or more required body parameters");
      done();
    });
  });

  it('400: missing bookshelf', function(done) {
    let task = {
        username: "sid",
        isbn: 1111111111
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(400);
        res.text.should.be.eql("Missing one or more required body parameters");
      done();
    });
  });

  it('400: missing isbn', function(done) {
    let task = {
        username: "sid",
        bookshelf: "want_to_read",
    }
    chai.request(server)
    .post('/bookshelves/remove')
    .send(task)
    .end(function(err, res) {
        res.should.have.status(400);
        res.text.should.be.eql("Missing one or more required body parameters");
      done();
    });
  });
});