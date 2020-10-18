import '../../__mocks__/pointerEventInWindowFalse.mock';
import '../../__mocks__/maxTouchPointsUndefined.mock';
import '../../__mocks__/onTouchStartInWindowTrue.mock';
import '../../__mocks__/touchEventInWindowTrue.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqTouchOnly.mock';

// mainly iOS <= v13.1 (Pointer Events were introduced in iOS v13.2), but also some older android browsers

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

test('supportsPointerEvents: false', () => {
  expect(supportsPointerEvents).toBe(false);
});

test('supportsTouchEvents: true', () => {
  expect(supportsTouchEvents).toBe(true);
});

test('supportsPassiveEvents: true', () => {
  expect(supportsPassiveEvents).toBe(true);
});
