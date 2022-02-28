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


describe('GET /bookshelves/get/:username/:bookshelf', function() {
  before(function(done) {
    initialize(done);
  });

  it('200: access single bookshelf', function(done) {
    chai.request(server)
    .get('/bookshelves/get/elliot/reading')
    .end(function(err, res) {
        res.should.have.status(200);
        res.body.length.should.be.eql(1);
        res.body[0].should.be.an('object');
        res.body[0].should.have.property("name");
        res.body[0].name.should.be.eql("reading");
        res.body[0].should.have.property("books");
        res.body[0].books.length.should.be.eql(2);
        res.body[0].books[0].should.be.an('object');
        res.body[0].books[0].should.have.property("isbn");
        res.body[0].books[0].isbn.should.be.eql(1111111111);
        res.body[0].books[0].should.have.property("title");
        res.body[0].books[0].title.should.be.eql("title1");
        res.body[0].books[0].should.have.property("authors");
        res.body[0].books[0].authors.length.should.be.eql(1)
        res.body[0].books[0].should.have.property("genres");
        res.body[0].books[0].genres.length.should.be.eql(1);
        res.body[0].books[1].should.be.an('object');
        res.body[0].books[1].should.have.property("isbn");
        res.body[0].books[1].isbn.should.be.eql(2222222222);
        res.body[0].books[1].should.have.property("title");
        res.body[0].books[1].title.should.be.eql("title2");
        res.body[0].books[1].should.have.property("authors");
        res.body[0].books[1].authors.length.should.be.eql(1)
        res.body[0].books[1].should.have.property("genres");
        res.body[0].books[1].genres.length.should.be.eql(1);
      done();
    });
  });

  it('200: access all bookshelves', function(done) {
    chai.request(server)
    .get('/bookshelves/get/elliot/all')
    .end(function(err, res) {
        // console.log(res.body)
        res.should.have.status(200);
        res.body.length.should.be.eql(3);
        res.body[1].should.be.an('object');
        res.body[1].should.have.property("name");
        res.body[1].name.should.be.eql("read");
        res.body[1].should.have.property("books");
        res.body[1].books.length.should.be.eql(1);
        res.body[1].books[0].should.be.an('object');
        res.body[1].books[0].should.have.property("isbn");
        res.body[1].books[0].isbn.should.be.eql(1111111111);
        res.body[1].books[0].should.have.property("title");
        res.body[1].books[0].title.should.be.eql("title1");
        res.body[1].books[0].should.have.property("authors");
        res.body[1].books[0].authors.length.should.be.eql(1)
        res.body[1].books[0].should.have.property("genres");
        res.body[1].books[0].genres.length.should.be.eql(1);
        res.body[0].should.be.an('object');
        res.body[0].should.have.property("name");
        res.body[0].name.should.be.eql("reading");
        res.body[0].should.have.property("books");
        res.body[0].books.length.should.be.eql(2);
        res.body[0].books[0].should.be.an('object');
        res.body[0].books[0].should.have.property("isbn");
        res.body[0].books[0].isbn.should.be.eql(1111111111);
        res.body[0].books[0].should.have.property("title");
        res.body[0].books[0].title.should.be.eql("title1");
        res.body[0].books[0].should.have.property("authors");
        res.body[0].books[0].authors.length.should.be.eql(1)
        res.body[0].books[0].should.have.property("genres");
        res.body[0].books[0].genres.length.should.be.eql(1);
        res.body[0].books[1].should.be.an('object');
        res.body[0].books[1].should.have.property("isbn");
        res.body[0].books[1].isbn.should.be.eql(2222222222);
        res.body[0].books[1].should.have.property("title");
        res.body[0].books[1].title.should.be.eql("title2");
        res.body[0].books[1].should.have.property("authors");
        res.body[0].books[1].authors.length.should.be.eql(1)
        res.body[0].books[1].should.have.property("genres");
        res.body[0].books[1].genres.length.should.be.eql(1);
        res.body[2].should.be.an('object');
        res.body[2].should.have.property("name");
        res.body[2].name.should.be.eql("want_to_read");
        res.body[2].should.have.property("books");
        res.body[2].books.length.should.be.eql(0);
      done();
    });
  });

  it('400: invalid bookshelf name', function(done) {
    chai.request(server)
    .get('/bookshelves/get/elliot/fake')
    .end(function(err, res) {
        // console.log(res.body)
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("error");
        res.body.error.should.be.eql("Invalid bookshelf name")
      done();
    });
  });

  it('400: invalid user', function(done) {
    chai.request(server)
    .get('/bookshelves/get/sid/read')
    .end(function(err, res) {
        // console.log(res.body)
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("error");
        res.body.error.should.be.eql("Invalid username parameter")
      done();
    });
  });
});