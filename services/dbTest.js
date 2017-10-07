DBLite = require('./dbLite').DBLite;

class DBTest extends DBLite {

    constructor(pathname) {
        super();
        this.init();
        this.connect(pathname, () => { console.log("connected"); });
    }

    static get userTable() {
        return [
            { "username": "Anton", "password": "abc123", "status": "OK" },
            { "username": "Shumin", "password": "xyz567", "status": "OK" },
            { "username": "Ritvik", "password": "def012", "status": "EMERGENCY" },
            { "username": "Ali", "password": "klm324", "status": "OK" },
            { "username": "Serra", "password": "gij876", "status": "OK" },
            { "username": "Dimitris", "password": "hik888", "status": "EMERGENCY" }
        ];
    }

    init() {
        this.users = DBTest.userTable;
    }

    connect(pathname, ready) {
        // some code to connect to a real database
    }

}

exports.DBTest = DBTest;