/* This file emulates database behavior. All methods here are asynchronous, e.g do not return results immediately.
You can work with them by supplying callbacks or using Promise API. */

let users = [{"username": "Anton", "status": "OK"},
             {"username": "Shumin", "status": "OK"},
             {"username": "Ritvik", "status": "EMERGENCY"}];

module.exports = {
  getAllUsers: function (cb) {
    return new Promise((resolve) => {
      setTimeout(function () {
        if (cb) {
          cb(users);
        }

        resolve(users);
      }, 20);
    });
  },

  addUser: function (user, cb) {
    return new Promise((resolve) => {
      setTimeout(function () {
        users.push(user);

        if (cb) {
          cb();
        }

        resolve();
      }, 20);
    });
  }
};
