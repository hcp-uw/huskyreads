const { assert } = require('chai');
const { response } = require('express');
var global = require('../global_utils');
var server = global.server;
var chai = global.chai;


initialize = async (done) => {
  await global.resetDB(() => {});
  done();
}


describe('GET /books/detail/:isbn', function() {
  before(function(done) {
    initialize(done);
  });

  it('400: invalid isbn format', function(done) {
    chai.request(server)
    .get('/books/detail/12312')
    .end(function(err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("error");
        res.body.error.should.be.eql("Invalid isbn")
      done();
    });
  });

  it('400: invalid isbn', function(done) {
    chai.request(server)
    .get('/books/detail/9999999999')
    .end(function(err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("error");
        res.body.error.should.be.eql("Invalid isbn")
      done();
    });
  });

  it('200: valid isbn not starting with 0', function(done) {
    chai.request(server)
    .get('/books/detail/1111111111')
    .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("title");
        res.body.title.should.be.eql("title1");
        res.body.should.have.property("datePublished");
        res.body.datePublished.should.be.eql("2020-12-1");
        res.body.should.have.property("description");
        res.body.description.should.be.eql("Long Description1");
        res.body.should.have.property("authors");
        res.body.authors.length.should.be.eql(1)
        res.body.should.have.property("genres");
        res.body.genres.length.should.be.eql(1)
      done();
    });
  });

  it('200: valid isbn not starting with 0(again)', function(done) {
    chai.request(server)
    .get('/books/detail/5555555555')
    .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("title");
        res.body.title.should.be.eql("title5");
        res.body.should.have.property("datePublished");
        res.body.datePublished.should.be.eql("2020-12-5");
        res.body.should.have.property("description");
        res.body.description.should.be.eql("Long Description5");
        res.body.should.have.property("authors");
        res.body.authors.length.should.be.eql(2)
        res.body.should.have.property("genres");
        res.body.genres.length.should.be.eql(2)
      done();
    });
  });

  it('200: valid ISBN 10 starting with 0', function(done) {
    chai.request(server)
    .get('/books/detail/0123456789')
    .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("title");
        res.body.title.should.be.eql("title0");
        res.body.should.have.property("datePublished");
        res.body.datePublished.should.be.eql("2020-11-1");
        res.body.should.have.property("description");
        res.body.description.should.be.eql("Long Description0");
        res.body.should.have.property("authors");
        res.body.authors.length.should.be.eql(1)
        res.body.should.have.property("genres");
        res.body.genres.length.should.be.eql(1)
        done();
    });
  });

  it('200: valid ISBN 13 not starting with 0', function(done) {
    chai.request(server)
    .get('/books/detail/7777777777777')
    .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("title");
        res.body.title.should.be.eql("title7");
        res.body.should.have.property("datePublished");
        res.body.datePublished.should.be.eql("2020-12-7");
        res.body.should.have.property("description");
        res.body.description.should.be.eql("Long Description7");
        res.body.should.have.property("authors");
        res.body.authors.length.should.be.eql(1)
        res.body.should.have.property("genres");
        res.body.genres.length.should.be.eql(1)
        done();
    });
  });

  it('200: valid ISBN 13 starting with 0', function(done) {
    chai.request(server)
    .get('/books/detail/0888888888888')
    .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("title");
        res.body.title.should.be.eql("title8");
        res.body.should.have.property("datePublished");
        res.body.datePublished.should.be.eql("2020-12-8");
        res.body.should.have.property("description");
        res.body.description.should.be.eql("Long Description8");
        res.body.should.have.property("authors");
        res.body.authors.length.should.be.eql(1)
        res.body.should.have.property("genres");
        res.body.genres.length.should.be.eql(1)
        done();
    });
  });

  it('200: valid ISBN 13 containing existing ISBN 10 substring', function(done) {
    chai.request(server)
    .get('/books/detail/1111111111111')
    .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property("title");
        res.body.title.should.be.eql("title11");
        res.body.should.have.property("datePublished");
        res.body.datePublished.should.be.eql("2020-11-11");
        res.body.should.have.property("description");
        res.body.description.should.be.eql("Long Description11");
        res.body.should.have.property("authors");
        res.body.authors.length.should.be.eql(1)
        res.body.should.have.property("genres");
        res.body.genres.length.should.be.eql(1)
        done();
    });
  });
});