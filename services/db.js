let users = [];

/*
This file emulates database behavior. All methods here are asynchronous, e.g do not return results immediately.
You can work with them by supplying callbacks or using Promise API. */
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
  },
  getUserByName: function (name, cb) {
    return new Promise((resolve) => {
      setTimeout(function () {
        for (let i = 0; i < users.length; i++) {
          if (users[i].name === name) {
            if (cb) {
              cb(users[i]);
            }

            resolve(users[i]);

            return;
          }
        }

        if (cb) {
          cb(null);
        }

        resolve(null);
      }, 20);
    });
  },
  deleteUserByName: function (name, cb) {
    return new Promise((resolve) => {
      for (let i = 0; i < users.length; i++) {
        let obj = users[i];

        if (obj.name === name) {
          users.splice(i, 1);
        }
      }

      setTimeout(() => {
        if (cb) {
          cb();
        }

        resolve();
      }, 20);
    });
  },
  deleteAllUsers: function (name, cb) {
    return new Promise((resolve) => {
        setTimeout(() => {
          users = [];

          if (cb) {
            cb();
          }

          resolve();
        }, 20);
      }
    );
  }
};