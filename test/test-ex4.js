let expect = require('chai').expect;
later = require('../lectureExamples/ex4').later;

suite('Some Class Examples', function () {

    test('async function later can produce result', function (done) {
        later("Whatever!", function (result) {
            // console.log(result);
            expect(result).to.equal("Whatever!");
            done();
        });
    });

});

