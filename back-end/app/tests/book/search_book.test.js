const { assert } = require('chai');
const { response } = require('express');
var global = require('../global_utils');
var server = global.server;
var chai = global.chai;


initialize = async (done) => {
  let user = {
      username: "elliot",
      password: "pass1"
  }
  await global.resetDB(() => {});
  await chai.request(server).post('/signup').send(user);
  done();
}


describe('GET /books/search', function() {
  before(function(done) {
    initialize(done);
  });

  it('200: Getting the first 10 books', function() {
    // with no input, the JSON should contain the simple info of just 10 books

    chai.request(server)
    .get('/books/search')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.property("remainingBooksInSearch");
      res.body.should.have.property("books");
      res.body.books.length.should.be.eql(10);
      done();
    });
  });
});