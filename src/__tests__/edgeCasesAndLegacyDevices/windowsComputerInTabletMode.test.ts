import '../../__mocks__/pointerEventInWindowTrue.mock';
import '../../__mocks__/maxTouchPointsOne.mock';
import '../../__mocks__/onTouchStartInWindowFalse.mock';
import '../../__mocks__/touchEventInWindowTrue.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqTouchOnly.mock';

// media query is touch only, but no onTouchStartInWindow
// because a mouse could added at any moment treat it as a hybrid

import {
  deviceType,
  primaryInput,
  supportsPointerEvents,
  supportsTouchEvents,
  supportsPassiveEvents,
} from '../../index';

test('deviceType: hybrid', () => {
  expect(deviceType).toBe('hybrid');
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
