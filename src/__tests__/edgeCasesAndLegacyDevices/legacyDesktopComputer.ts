import '../../__mocks__/pointerEventInWindowFalse.mock';
import '../../__mocks__/maxTouchPointsUndefined.mock';
import '../../__mocks__/onTouchStartInWindowFalse.mock';
import '../../__mocks__/touchEventInWindowFalse.mock';
import '../../__mocks__/passiveEventsFalse.mock';
import '../../__mocks__/mqMatchMediaUndefined.mock';

// legacy mouse only computer that doesn't support Pointer Events or media queries

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

test('supportsPointerEvents: false', () => {
  expect(supportsPointerEvents).toBe(false);
});

test('supportsTouchEvents: false', () => {
  expect(supportsTouchEvents).toBe(false);
});

test('supportsPassiveEvents: false', () => {
  expect(supportsPassiveEvents).toBe(false);
});
