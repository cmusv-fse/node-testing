
//let expect = require('expect.js');

let expect = require('chai').expect;

let DAO = require('../services/DAO').DAO;
let DB = require('../services/dbTest').DBTest;

suite('DATABASE TESTS:', function () {

    var db;

    setup(function () {
        db = new DB("/home/data/userDB.db");
    });

    test('Can get users from DB', function (/* done */) {

        /* db.getAllUsers(function(users) { 
          // ...this will work too...
        }); */
        // if we return a promise, we don't need done();
        return db.getAllUsers().then((users) => {
            expect(users).to.deep.include({ "username": "Anton", "password": "abc123", "status": "OK" });
            expect(users).to.deep.include({ "username": "Shumin", "password": "xyz567", "status": "OK" });
            expect(users).to.deep.include({ "username": "Ritvik", "password": "def012", "status": "EMERGENCY" });
        });
    });

    test('Can find user in DB', function () {
        return db.findUserByUsername("Shumin").then((user) => {
            expect(user.username).to.equal("Shumin");
        });
    });

    test('Can add users to DB', function () {
        let hakan = { "username": "Hakan", "password": "xyz567", "status": "OK" };
        return db.addUser(hakan).then(() => {
            db.findUserByUsername(hakan.username).then((user) => {
                expect(user.username).to.equal(hakan.username);
            })
        });
        // assertions and done() cannot be here, otherwise test may finish before promise is resolved
    });

});
