import '../../__mocks__/passiveEventsTrue.mock';

import { supportsPassiveEvents } from '../../index';

test('supportsPassiveEvents: true', () => {
  expect(supportsPassiveEvents).toBe(true);
});
