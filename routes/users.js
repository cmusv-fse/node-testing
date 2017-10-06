let express = require('express');
let router = express.Router();
let db = require('../services/db');
let helper = require('../services/helper')

/* GET users listing. */
router.get('/', function (req, res, next) {
  // example of handling async calls with callbacks
  db.getAllUsers((users) => {
    res.status(200).json(users)
  });
});

/* GET users listing. */
router.get('/emergency', function (req, res, next) {
  // example of handling async calls with callbacks
  db.getAllUsers((users, filterEmergency) => {

    // You can abstract the logic in a callback into a separate module to make it testable.
    var emergencyUsers = users.filter((elem, index, array) => {
      return elem.status == "EMERGENCY"
    })
    // var emergencyUsers = helper.filterEmergency(users)

    res.status(200).json(emergencyUsers)
  });
});

router.post('/', function (req, res, next) {
  if(helper.validateUsername(req.body.username) && helper.validatePassword(req.body.password) && req.body.status != undefined) {
    db.addUser(req.body).then(() => {
      res.status(201).end();
    });
  } else {
    res.status(406).end()
  }
});

module.exports = router;
