const { assert } = require('chai');
const { response } = require('express');
var global = require('../global_utils');
var server = global.server;
var chai = global.chai;


initialize = async (done) => {
  await global.resetDB(() => {});
  done();
}


describe('GET /books/search', function() {
  before(function(done) {
    initialize(done);
  });

  it('200: no input params', function(done) {
    chai.request(server)
    .get('/books/search')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(5);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: only title param', function(done) {
    chai.request(server)
    .get('/books/search?title=title1')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(1);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: only author param', function(done) {
    chai.request(server)
    .get('/books/search?author=Foo Bar the Third')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(3);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: only 1 genre param', function(done) {
    chai.request(server)
    .get('/books/search?genre[0]=Horror')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(1);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: only 2 genre params', function(done) {
    chai.request(server)
    .get('/books/search?genre[0]=Young Adult&genre[1]=Thriller')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(1);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: only offset param', function(done) {
    chai.request(server)
    .get('/books/search?offset=1')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(4);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: only resultLength param', function(done) {
    chai.request(server)
    .get('/books/search?resultLength=2')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(3);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(2);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: offset and resultLength param', function(done) {
    chai.request(server)
    .get('/books/search?offset=1&resultLength=2')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(2);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(2);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: title and author params', function(done) {
    chai.request(server)
    .get('/books/search?title=title5&author=Suzzy Collins')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(1);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: title and genre params', function(done) {
    chai.request(server)
    .get('/books/search?title=title5&genre[0]=thriller')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(1);
      res.body.books[0].should.have.property("title");
      res.body.books[0].should.have.property("authors");
      res.body.books[0].should.have.property("isbn");
      done();
    });
  });

  it('200: title and bad author params', function(done) {
    chai.request(server)
    .get('/books/search?title=title5&author=Bad Author')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.remainingBooksInSearch.should.be.eql(0);
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(0);
      done();
    });
  });
});