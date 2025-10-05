
const DAC = require('../../server/dataAccess/dac').DAC;

test('Can inject DB into DAC', () => {
  DAC.db = "someDB";
  expect(DAC.db).toBe("someDB");
});

