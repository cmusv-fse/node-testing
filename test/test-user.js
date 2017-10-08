
//let expect = require('expect.js');

let expect = require('chai').expect;
let User = require('../models/user').User;
let DB = require('../services/dbLite').DBLite;
let DAO = require('../services/dao').DAO;
var Status = require('../models/status').Status;

suite('USER TESTS:', function () {

  test('Username should not be a stop word', function (done) {
    var isValid = User.validateUsername('admin');
    expect(isValid).not.to.equal(true);
    done();
  });

  test('Should not create user with invalid username', function (done) {
    try {
      var newUser = new User('admin', 'xyz123', 'OK');
      expect.fail("erroneously valid username");
    } catch (err) {
      expect(err.message || err).to.equal("invalid username");
      done();
    }
  });

  test('Should not create user with invalid password', function (done) {
    try {
      var newUser = new User('Wang', '123', 'OK');
      expect.fail("erroneously valid password");
    } catch (err) {
      expect(err.message || err).to.equal("invalid password");
      done();
    }
  });

  test('Should not create user with multiple invalid credentials', function (done) {
    try {
      var newUser = new User('account', 'a0', 'OK');
      expect.fail("erroneously valid password");
    } catch (err) {
      expect(err.message || err).to.equal("invalid username");
      done();
    }
  });

  test('Password should not be less than 4 chars', function (done) {
    var isValid = User.validatePassword('a');
    expect(isValid).not.to.equal(true);
    done();
  });

  test('Username should not be less than 3 chars', function (done) {
    var isValid = User.validateUsername('a');
    expect(isValid).to.equal(false);
    done();
  });

  test('It should be possible to filter users wrt emergency status', function (done) {
    var users = [
      { username: 'Anton', status: 'OK' },
      { username: 'Shumin', status: 'OK' },
      { username: 'Ritvik', status: 'HELP' }
    ];
    var expected = [{ username: 'Ritvik', status: 'HELP' }];
    var actual = User.filter(users, 'HELP');
    // the comparison must be eql here for deep equality // 
    expect(actual).to.eql(expected);
    done();
  });

  test('It should be possible to save a new user', function () {
    DAO.db = new DB();
    let hakan = new User('Hakan', 'xyz567', 'OK');
    return hakan.save().then(() => {
      DAO.db.findUserByUsername(hakan.username).then((user) => {
        expect(user.username).to.equal(hakan.username);
      })
    });
  });

  test('It should not be possible to save an existing user', function () {
    DAO.db = new DB();
    let shumin = new User('Shumin', 'xyz567', 'OK');
    return shumin.save().then(() => {
      expect.fail(0, 0, "double saving of user");
    }, (err) => {
    });
  });

  test('It should be possible to retrive an existing user by username', function () {
    DAO.db = new DB();
    return User.retrieve('Shumin').then((user) => {
      expect(user.username).to.equal('Shumin');
    });
  });

  test('It should not be possible to retrive a non-existing user by username', function () {
    DAO.db = new DB();
    return User.retrieve('Hakan').then((user) => {
      expect.fail(0, 0, "non-existing user retrieved");
    }, (err) => {
    });
  });

});
