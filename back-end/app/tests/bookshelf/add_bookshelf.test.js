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

  it('200: adding a book', function(done) {
      done();
    });
});