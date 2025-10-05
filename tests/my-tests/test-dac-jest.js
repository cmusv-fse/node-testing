
let DAC = require('../../services/dac').DAC;

test('Can inject DB into DAC', () => {
  DAC.db = "someDB";
  expect(DAC.db).toBe("someDB");
});

