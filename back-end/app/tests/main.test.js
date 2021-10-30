var global = require('./global_utils');
var fs = require('fs');

function runTests(description, path) {
    var normalizedPath = require("path").join(__dirname, path);
    describe(description, function() {
        fs.readdirSync(normalizedPath).forEach(function(file) {
            require(path + "/" + file);
        });
    });
}

describe("Running Tests", function() {
    runTests("Testing user_routes.js", "./user");
    after(function(done) {
        console.log("\n  Finished!");
        done();
    })
})


