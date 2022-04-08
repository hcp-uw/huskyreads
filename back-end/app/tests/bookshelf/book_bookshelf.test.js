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
    let task = {
        username: "elliot",
        bookshelf: "reading",
        isbn: 1111111111,
    }
    let task1 = {
        username: "elliot",
        bookshelf: "read",
        isbn: 1111111111,
    }
    let task2 = {
        username: "elliot",
        bookshelf: "reading",
        isbn: 2222222222,
    }
    let task3 = {
        username: "elliot",
        bookshelf: "want_to_read",
        isbn: 3333333333,
    }
    let task4 = {
        username: "elliot",
        bookshelf: "want_to_read",
        isbn: 4444444444,
    }
    let task5 = {
        username: "elliot",
        bookshelf: "read",
        isbn: 4444444444,
    }
    let task6 = {
        username: "elliot",
        bookshelf: "reading",
        isbn: 4444444444,
    }
    let task7 = {
        username: "frank",
        bookshelf: "want_to_read",
        isbn: 5555555555,
    }
    await global.resetDB(() => {});
    await chai.request(server).post('/signup').send(user1);
    await chai.request(server).post('/signup').send(user2);
    await chai.request(server).post('/bookshelves/add').send(task);
    await chai.request(server).post('/bookshelves/add').send(task1);
    await chai.request(server).post('/bookshelves/add').send(task2);
    await chai.request(server).post('/bookshelves/add').send(task3);
    await chai.request(server).post('/bookshelves/add').send(task4);
    await chai.request(server).post('/bookshelves/add').send(task5);
    await chai.request(server).post('/bookshelves/add').send(task6);
    await chai.request(server).post('/bookshelves/add').send(task7);
    done();
}


describe('GET /bookshelves/book/:username/:isbn', function() {
    before(function(done) {
      initialize(done);
    });
  
    it('200: get bookshelves when user has 0 bookshelves with book', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/5555555555')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(0);
            res.body.should.be.eql([]);
            done();
        });
    });

    it('200: get bookshelves when user has 1 bookshelf with book', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/2222222222')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(1);
            res.body[0].should.be.eql("reading");
            done();
        });
    });

    it('200: get bookshelves when user has 1 bookshelf with book', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/3333333333')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(1);
            res.body[0].should.be.eql("want_to_read");
            done();
        });
    });

    it('200: get bookshelves when user has 1 bookshelf with book', function(done) {
        chai.request(server)
        .get('/bookshelves/book/frank/5555555555')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(1);
            res.body[0].should.be.eql("want_to_read");
            done();
        });
    });
    
    it('200: get bookshelves when user has 2 bookshelf with book', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/1111111111')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(2);
            res.body[0].should.be.eql("reading");
            res.body[1].should.be.eql("read");
            done();
        });
    });

    it('200: get bookshelves when user has 3 bookshelf with book', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/4444444444')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(3);
            res.body[0].should.be.eql("want_to_read");
            res.body[1].should.be.eql("read");
            res.body[2].should.be.eql("reading");
            done();
        });
    });

    it('401: invalid username', function(done) {
        chai.request(server)
        .get('/bookshelves/book/FakeName/2222222222')
        .end(function(err, res) {
            res.should.have.status(401);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.should.have.property("error");
            res.body.error.should.be.eql("Invalid username parameter")
            done();
        });
    });

    it('401: invalid isbn format', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/12312')
        .end(function(err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.should.have.property("error");
            res.body.error.should.be.eql("Book does not exist")
            done();
        });
    });

    it('401: invalid isbn', function(done) {
        chai.request(server)
        .get('/bookshelves/book/elliot/0000000000')
        .end(function(err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.should.have.property("error");
            res.body.error.should.be.eql("Book does not exist")
            done();
        });
    });

    it('401: invalid username and isbn', function(done) {
        chai.request(server)
        .get('/bookshelves/book/FakeName/0000000000')
        .end(function(err, res) {
            res.should.have.status(401);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.should.have.property("error");
            res.body.error.should.be.eql("Invalid username parameter")
            done();
        });
    });
});