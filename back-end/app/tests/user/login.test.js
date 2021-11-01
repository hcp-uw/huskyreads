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

describe('POST /login', function() {
    before(function(done) {
        initialize(done);
    })
    
    it('200: login user', function(done) {
        let user = {
            username: "elliot",
            password: "pass1"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.equal.toString("Login Successful");
            done();
        })
    })

    it('200: login second user', function(done) {
        let user = {
            username: "frank",
            password: "pass2"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.equal.toString("Login Successful");
            done();
        })
    })

    it('200: login third user', function(done) {
        let user = {
            username: "vikram",
            password: "pass1"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.equal.toString("Login Successful");
            done();
        })
    })

    it('400: missing username', function(done) {
        let user = {
            password: "pass1"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(400);
            res.text.should.be.equal.toString("Missing username or password");
            done();
        })
    })

    it('400: missing username', function(done) {
        let user = {
            username: "vikram"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(400);
            res.text.should.be.equal.toString("Missing username or password");
            done();
        })
    })

    it('400: missing username and password', function(done) {
        let user = {
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(400);
            res.text.should.be.equal.toString("Missing username or password");
            done();
        })
    })

    it('401: invalid username', function(done) {
        let user = {
            username: "vik",
            password: "pass1"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(401);
            res.text.should.be.equal.toString("Invalid user credentials");
            done();
        })
    })

    it('401: invalid password', function(done) {
        let user = {
            username: "vikram",
            password: "pass123"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(401);
            res.text.should.be.equal.toString("Invalid user credentials");
            done();
        })
    })

    it('401: invalid username and password', function(done) {
        let user = {
            username: "vik",
            password: "pass123"
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(401);
            res.text.should.be.equal.toString("Invalid user credentials");
            done();
        })
    })
})