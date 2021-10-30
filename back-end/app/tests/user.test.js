var global = require('./global_utils');
var server = global.server;
var chai = global.chai;
var should = global.should;

describe("User Integration Test", function() {
    describe('/POST Url: /signup', function() {
        it('should signup user', function(done) {
            let user = {
                username: "elliot",
                password: "pass1"
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            })
        })
    })
})