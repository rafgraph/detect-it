import '../../__mocks__/pointerEventInWindowFalse.mock';
import '../../__mocks__/maxTouchPointsUndefined.mock';
import '../../__mocks__/onTouchStartInWindowTrue.mock';
import '../../__mocks__/touchEventInWindowFalse.mock';
import '../../__mocks__/passiveEventsFalse.mock';
import '../../__mocks__/mqMatchMediaUndefined.mock';

// legacy touch device that doesn't support Pointer Events or media queries

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

test('supportsPassiveEvents: false', () => {
  expect(supportsPassiveEvents).toBe(false);
});
