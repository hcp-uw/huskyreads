var global = require('./global_utils');

describe("Main", function() {
    before(function(done) {
        global.resetDB(done);
    })
    require("./user.test");
    after(function(done) {
        console.log("Finished!");
        done();
    })
})


