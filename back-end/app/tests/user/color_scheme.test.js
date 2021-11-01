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

describe('POST /color_scheme', function() {
    before(function(done) {
        initialize(done);
    })
    
    it('200: same color (from default)', function(done) {
        let user = {
            username: "elliot",
            color_scheme: "light"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.to.equal("Color Scheme Updated Successfully");
            done();
        })
    })

    it('200: different color (from default)', function(done) {
        let user = {
            username: "frank",
            color_scheme: "dark"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.to.equal("Color Scheme Updated Successfully");
            done();
        })
    })

    it('200: same color', function(done) {
        let user = {
            username: "elliot",
            color_scheme: "light"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.to.equal("Color Scheme Updated Successfully");
            done();
        })
    })

    it('200: different color', function(done) {
        let user = {
            username: "elliot",
            color_scheme: "dark"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.to.equal("Color Scheme Updated Successfully");
            done();
        })
    })

    it('200: reset color', function(done) {
        let user = {
            username: "elliot",
            color_scheme: "light"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.to.equal("Color Scheme Updated Successfully");
            done();
        })
    })

    it('200: different color', function(done) {
        let user = {
            username: "elliot",
            color_scheme: "dark"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.be.to.equal("Color Scheme Updated Successfully");
            done();
        })
    })

    it('400: missing username', function(done) {
        let user = {
            color_scheme: "dark"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(400);
            res.text.should.be.to.equal("Missing username or color_scheme");
            done();
        })
    })

    it('400: missing color_scheme', function(done) {
        let user = {
            username: "elliot"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(400);
            res.text.should.be.to.equal("Missing username or color_scheme");
            done();
        })
    })

    it('400: missing username and color_scheme', function(done) {
        let user = {

        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(400);
            res.text.should.be.to.equal("Missing username or color_scheme");
            done();
        })
    })

    it('401: invalid username', function(done) {
        let user = {
            username: "elliot123",
            color_scheme: "dark"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(401);
            res.text.should.be.to.equal("Invalid username");
            done();
        })
    })

    it('401: invalid username and color_scheme', function(done) {
        let user = {
            username: "elliot123",
            color_scheme: "dark123"
        }
        chai.request(server)
        .post('/color_scheme')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(401);
            res.text.should.be.to.equal("Invalid username");
            done();
        })
    })
})