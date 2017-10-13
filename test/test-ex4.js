let expect = require('chai').expect;
later = require('../lectureExamples/ex4').later;

suite('Timeout test', function () {

    test('can print whatever', function (done) {
        later("Whatever!", function (result) {
            // console.log(result);
            expect(result).to.equal("Whatever!");
            done();
        });
    });

});

