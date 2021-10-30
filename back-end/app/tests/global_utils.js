// Just in case we end up using a different databse for testing, we have
// a way to create a new url
process.env.NODE_ENV = 'test';

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { db } = require('../utils/db');
const path = require('path');
const fs = require('fs');
const should = chai.should();

chai.use(chaiHttp);

resetDB = async (res) => {
    const query = fs.readFileSync(path.join(__dirname, './resetdb.sql')).toString();
    await db.query(query);
    res();
}

exports.server = server;
exports.chai = chai;
exports.should = should;
exports.resetDB = resetDB;