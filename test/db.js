let expect = require('expect.js');
let db = require('../services/db');

suite('Database tests', function () {
  test('Empty database should contain no users', function (done) {
    db.getAllUsers().then((users) => {
      expect(users.length).to.be.eql(0);
      done();
    });
  });
});
