
import { DAC } from '../../server/dataAccess/dac.js';

test('Can inject DB into DAC', () => {
  DAC.db = "someDB";
  expect(DAC.db).toBe("someDB");
});

