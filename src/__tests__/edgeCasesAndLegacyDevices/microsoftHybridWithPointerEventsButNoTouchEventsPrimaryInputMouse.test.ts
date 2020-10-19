import '../../__mocks__/pointerEventInWindowTrue.mock';
import '../../__mocks__/maxTouchPointsOne.mock';
import '../../__mocks__/onTouchStartInWindowFalse.mock';
import '../../__mocks__/touchEventInWindowFalse.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqHybridPrimaryInputMouse.mock';

// microsoft browsers before switching to chromium (IE and Edge <= v18) didn't support Touch Events

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
