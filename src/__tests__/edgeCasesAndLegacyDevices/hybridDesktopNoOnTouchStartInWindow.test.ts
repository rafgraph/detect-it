import '../../__mocks__/pointerEventInWindowTrue.mock';
import '../../__mocks__/maxTouchPointsOne.mock';
import '../../__mocks__/onTouchStartInWindowFalse.mock';
import '../../__mocks__/touchEventInWindowTrue.mock';
import '../../__mocks__/passiveEventsTrue.mock';
import '../../__mocks__/mqHybridPrimaryInputMouse.mock';

// onTouchStartInWindow is the old-old-legacy way to determine a touch device
// and many websites interpreted it to mean that the device is a touch only phone,
// so today browsers on a desktop/laptop computer with a touch screen (primary input mouse)
// have onTouchStartInWindow as false (to prevent from being confused with a
// touchOnly phone) even though they support the TouchEvents API

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
