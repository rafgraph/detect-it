import '../../__mocks__/pointerEventInWindowTrue.mock';
import '../../__mocks__/maxTouchPointsOne.mock';
import '../../__mocks__/onTouchStartInWindowTrue.mock';
import '../../__mocks__/touchEventInWindowTrue.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqTouchOnly.mock';
import '../../__mocks__/userAgentMac.mock';
import '../../__mocks__/screen414x896.mock';

import {
  deviceType,
  primaryInput,
  supportsPointerEvents,
  supportsTouchEvents,
  supportsPassiveEvents,
} from '../../index';

test('deviceType: touchOnly', () => {
  expect(deviceType).toBe('touchOnly');
});

test('primaryInput: touch', () => {
  expect(primaryInput).toBe('touch');
});

test('supportsPointerEvents: true', () => {
  expect(supportsPointerEvents).toBe(true);
});

test('supportsTouchEvents: true', () => {
  expect(supportsTouchEvents).toBe(true);
});

test('supportsPassiveEvents: true', () => {
  expect(supportsPassiveEvents).toBe(true);
});
