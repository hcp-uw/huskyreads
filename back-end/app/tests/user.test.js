var global = require('./global_utils');
var server = global.server;
var chai = global.chai;
var should = global.should;

describe("Testing user_routes.js", function() {
    describe('POST /signup', function() {
        it('200: signup user', function(done) {
            let user = {
                username: "elliot",
                password: "pass1"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.text.should.be.equal.toString("Signup Successful");
                done();
            })
        })
        it('200: signup second user', function(done) {
            let user = {
                username: "frank",
                password: "pass2"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.text.should.be.equal.toString("Signup Successful");
                done();
            })
        })
        it('200: signup third user', function(done) {
            let user = {
                username: "vikram",
                password: "pass1"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.text.should.be.equal.toString("Signup Successful");
                done();
            })
        })
        it('400: username already exists', function(done) {
            let user = {
                username: "frank",
                password: "pass1"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(400);
                res.text.should.be.equal.toString("Username already taken");
                done();
            })
        })
        it('400: missing username', function(done) {
            let user = {
                password: "pass1"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(400);
                res.text.should.be.equal.toString("Missing username or password");
                done();
            })
        })
        it('400: missing password', function(done) {
            let user = {
                username: "frank",
            }
            chai.request(server)
            .post('/signup')
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
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(400);
                res.text.should.be.equal.toString("Missing username or password");
                done();
            })
        })
        it('400: empty username', function(done) {
            let user = {
                username: "",
                password: "pass1"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(400);
                res.text.should.be.equal.toString("Missing username or password");
                done();
            })
        })
        it('400: empty password', function(done) {
            let user = {
                username: "frank",
                password: ""
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(400);
                res.text.should.be.equal.toString("Missing username or password");
                done();
            })
        })
        it('400: empty username and password', function(done) {
            let user = {
                username: "",
                password: ""
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(400);
                res.text.should.be.equal.toString("Missing username or password");
                done();
            })
        })
    })
})