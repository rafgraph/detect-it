import '../../__mocks__/pointerEventInWindowTrue.mock';
import '../../__mocks__/maxTouchPointsOne.mock';
import '../../__mocks__/onTouchStartInWindowTrue.mock';
import '../../__mocks__/touchEventInWindowTrue.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqHybridPrimaryInputMouse.mock';

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

test('supportsTouchEvents: true', () => {
  expect(supportsTouchEvents).toBe(true);
});

test('supportsPassiveEvents: true', () => {
  expect(supportsPassiveEvents).toBe(true);
});
