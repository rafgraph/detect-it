import '../../__mocks__/pointerEventInWindowTrue.mock';
import '../../__mocks__/maxTouchPointsZero.mock';
import '../../__mocks__/onTouchStartInWindowFalse.mock';
import '../../__mocks__/touchEventInWindowTrue.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqMouseOnly.mock';

// some browsers (chromium) support the TouchEvents API even when running on
// a mouse only device (touchEventInWindow true, but onTouchStartInWindow false)

import {
  deviceType,
  primaryInput,
  supportsPointerEvents,
  supportsTouchEvents,
  supportsPassiveEvents,
} from '../../index';

test('deviceType: mouseOnly', () => {
  expect(deviceType).toBe('mouseOnly');
});

test('primaryInput: mouse', () => {
  expect(primaryInput).toBe('mouse');
});

test('supportsPointerEvents: true', () => {
  expect(supportsPointerEvents).toBe(true);
});

test('supportsTouchEvents: false', () => {
  expect(supportsTouchEvents).toBe(false);
});

test('supportsPassiveEvents: true', () => {
  expect(supportsPassiveEvents).toBe(true);
});
