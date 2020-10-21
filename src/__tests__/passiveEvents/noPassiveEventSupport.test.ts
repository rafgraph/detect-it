import '../../__mocks__/passiveEventsFalse.mock';

import { supportsPassiveEvents } from '../../index';

test('supportsPassiveEvents: false', () => {
  expect(supportsPassiveEvents).toBe(false);
});
