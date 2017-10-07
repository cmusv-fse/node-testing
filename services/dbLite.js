
class DBLite {

    constructor() {
        this.users = [];
        this.users.push({ "username": "Anton", "password": "abc123", "status": "OK" });
        this.users.push({ "username": "Shumin", "password": "xyz567", "status": "OK" });
        this.users.push({ "username": "Ritvik", "password": "def012", "status": "EMERGENCY" });
    }

    getAllUsers(cb) {
        // the following is necessary to hoist the value inside the callbacks
        // otherwise this.users will be undefined inside setTimeout
        let users = this.users;
        return new Promise((resolve) => {
            setTimeout(function () {
                if (cb) {
                    cb(users);
                }
                resolve(users);
            }, 20);
        });
    }

    findUserByUsername(username, cb) {
        let user = this.users.find((u) => u.username === username);
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (cb) {
                    cb(user);
                }
                if (!user) {
                    reject("User not found!");
                } else {
                    resolve(user);
                }
            }, 20);
        });
    }

    addUser(user, cb) {
        let users = this.users; // this is necessary
        let exists = users.find((u) => u.username === user.username);
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (exists) {
                    reject(exists);
                } else {
                    users.push(user);
                    if (cb) {
                        cb();
                    }
                    resolve();
                }
            }, 20);
        });
    }

}

exports.DBLite = DBLite;
