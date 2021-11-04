var global = require('./global_utils');
var fs = require('fs');

// Run test in directory
function runTests(description, path) {
    var normalizedPath = require("path").join(__dirname, path);
    describe(description, function() {
        fs.readdirSync(normalizedPath).forEach(function(file) {
            require(path + "/" + file);
        });
    });
}

// Run all tests
describe("Running all tests", function() {
    runTests("Testing user_routes.js", "./user");
    runTests("Testing bookshelf_routes.js", "./bookshelf");
    after(function(done) {
        console.log("\n  Finished!");
        done();
    });
});


