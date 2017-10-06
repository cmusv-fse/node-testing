let expect = require('expect.js');
let db = require('../services/db');
let helper = require('../services/helper')

suite('Join Community Tests', function () {
  test('Username cannot be from stop word', function (done) {
    var isValid = helper.validateUsername("admin");
    expect(isValid).not.to.be.ok();
    done();
  });

  test('Username length should not be < 3', function(done) {
    var isValid = helper.validateUsername("un");
    expect(isValid).not.to.be.ok();
    done();
  });

  test('Username length should be >= 3', function(done) {
    var isValid = helper.validateUsername("anton");
    expect(isValid).to.be.ok();
    done();
  });

  test('Password should not be < 4', function(done) {
    var isValid = helper.validatePassword("123");
    expect(isValid).not.to.be.ok();
    done();
  });

  test('Password should be >= 4', function(done) {
    var isValid = helper.validatePassword("1234");
    expect(isValid).to.be.ok();
    done();
  });

  test('Get users with emergency status', function(done) {
    var sampleInput = [{"username": "anton", "status": "OK"},
                       {"username": "shumin", "status": "EMERGENCY"}];
    var expectedOutput = [{"username": "shumin", "status": "EMERGENCY"}];

    var emergencyUsers = helper.filterEmergency(sampleInput);
    expect(emergencyUsers).to.eql(expectedOutput)
    done();
  });

  test('Get users all users', function(done){
    db.getAllUsers(function (users) {
      expect(users).to.be.an('array');
      expect(users[0].username).to.equal("Anton");
      done();
    });
  });
});
