let express = require('express');
let router = express.Router();
let db = require('../services/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // example of handling async calls with callbacks
  db.getAllUsers((users) => {
    res.status(200).json(users)
  });
});

/* GET user . */
router.get('/:name', function (req, res, next) {
  // example of handling async calls with promises
  db.getUserByName(req.params.name).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found!');
    }
  });
});

router.post('/', function (req, res, next) {
  db.addUser(req.body).then(() => {
    res.status(201).end();
  });
});

router.delete('/:name', function (req, res, next) {
  db.deleteUserByName(req.params.name).then(() => {
    res.status(200).end();
  });
});

router.delete('/', function (req, res, next) {
  db.deleteAllUsers().then(() => {
    res.status(200).end();
  });
});

module.exports = router;
