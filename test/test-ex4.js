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

    test('check set equality works', function (done) {
        expect(new Set([1, 2, 3])).to.eql(new Set([2, 1, 3]));
        expect([1, 2, 3]).to.not.eql([2, 1, 3]);
        done();
    });

});

