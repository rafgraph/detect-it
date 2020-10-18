import * as detectIt from '../index';

test('basic', () => {
  expect(detectIt.supportsPassiveEvents).toBe(true);
});
