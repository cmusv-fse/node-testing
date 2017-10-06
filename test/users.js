let expect = require('expect.js');
let db = require('../services/db');
let helper = require('../services/helper')

suite('Join Community Tests', function () {
  test('Username cannot be from stop word', function (done) {
    // Your assertion statements here
    var ret = helper.validateUsername('admin');
    expect(ret).not.to.be.ok();
    done();
  });

  test('Username cannot be less than 3', function(done){
    var ret = helper.validateUsername('a');
    expect(ret).not.to.be.ok();
    done();
  });


  test('Get all users', function(done){
    db.getAllUsers(function(user){
      expect(user[0].username).to.equal('Anton');
      expect(user[1].username).to.equal('Shumin');
        done();
    });

  });

  test('filter users with emergency status', function(done){
     var list = [{"username": "Anton", "status": "OK"},
                  {"username": "Shumin", "status": "OK"},
                  {"username": "Ritvik", "status": "EMERGENCY"}];
      var expectedOut = [{"username":"Ritvik", "status":"EMERGENCY"}];
      var out = helper.filterEmergency(list);
      expect(out).to.be.eql(expectedOut);
      done();
  });

});
