let expect = require('chai').expect;

suite('Misc Examples', function () {

    test('check set equality works', function (done) {
        expect(new Set([1, 2, 3])).to.eql(new Set([2, 1, 3]));
        expect([1, 2, 3]).to.not.eql([2, 1, 3]);
        done();
    });

    test('when done cb is omitted, test passes', function () {
        //
    });

    /* 
    test('when done cb exists but you forget to call it, test fails', function (done) {
        //
    });
    */

    test("michael's example, no err, should pass", function (done) {
        // this.timeout(1000); // may not be needed
        foo("data", 0, function (err, res) {
            expect(err).to.be.false;
            expect(res).to.equal("right object");
            done();
        });
    });

    test("michael's example, with err, should pass", function (done) {
        // this.timeout(1000); // may not be needed
        foo("data", 1, function (err, res) {
            expect(err).to.be.true;
            done();
        });
    });

    test("michael's example, with err, should fail with timeout", function (done) {
        // this.timeout(1000); // may not be needed
        foo("data", 1, function (err, res) {
            expect(err).to.be.false;
            // expect(res).to.equal("right object");
            done(); // done will never be called when assertion fails because of use of promise in called code
        });
    });

    test("michael's example, with err, should fail gracefully", function () {
        // this.timeout(1000); // may not be needed
        return betterfoo("data", 1).then((res) => { // return the promise to inform mocha
            expect(res).to.equal("right object");
        }).catch((err) => {
            expect.fail("o oh, I didn't expect this!");
        });
    });

    test("michael's example, removed done, will always pass", function () {
        // this.timeout(1000); // may not be needed
        foo("data", 0, function (err, res) {
            expect(false).to.be.true;
        });
    });

    /* michael's function */
    function foo(mydata, myerr, cb) {
        let timeStamp = new Date()//set current date

        let newInvestigation = {
            timestamp: timeStamp,
            data: mydata,
            err: myerr
        };
        newInvestigation.save = function () {
            return new Promise((resolve, reject) => {
                // fake async function
                setTimeout(function () {
                    if (newInvestigation.err) {
                        reject("something is wrong");
                    } else {
                        resolve("right object");
                    }
                }, 500);
            })
        };

        newInvestigation.save().then(function (res) {
            cb(false, res);
        }).catch((err) => {
            // console.log(err)
            cb(true, err);
        }).catch((err) => {  // this is necessary in case an error is thrown in the cb
            // do nothing 
        });
    }

    /* michael's function */
    function betterfoo(mydata, myerr) {
        let timeStamp = new Date()//set current date

        let newInvestigation = {
            timestamp: timeStamp,
            data: mydata,
            err: myerr
        };
        newInvestigation.save = function () {
            return new Promise((resolve, reject) => {
                // fake async function
                setTimeout(function () {
                    if (newInvestigation.err) {
                        reject("something is wrong");
                    } else {
                        resolve("right object");
                    }
                }, 500);
            })
        };

        return newInvestigation.save();
    }

    test("seemingly async, but effectively sync code", function () {
        let add = function (x, y, callback) {
            callback(x + y);
        } // just returning result via callback, structurally async

        let tata;
        add(4, 5, (result) => {
            tata = result; // … but effectively sync
        });
        expect(tata).to.equal(9);

    });

    test("singleton has single instance", function () {
        let Singleton = require('../lectureExamples/singleton.js').Singleton;

        s = new Singleton();
        expect(s.instance).to.equal(undefined);
        expect(s.curId()).to.equal("id = myid");
        s.id = "yourid";
        expect(s.curId()).to.equal("id = yourid");
        s = new Singleton();
        expect(s.curId()).to.equal("id = yourid");
    });

});
