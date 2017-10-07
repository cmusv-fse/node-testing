
//let expect = require('expect.js');

let expect = require('chai').expect;
let DAO = require('../services/DAO').DAO;

suite('DAO TESTS:', function () {

  test('Can inject DB into DAO', function (done) {
    DAO.db = "someDB";
    expect(DAO.db).to.equal("someDB");
    done();
  });

});
