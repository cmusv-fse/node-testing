
let _DB = null;

class DAC {

    constructor() {

    }

    static set db(_db) {
        _DB = _db;
    }

    static get db() {
        return _DB;
    }

}

exports.DAC = DAC;
