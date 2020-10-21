/**
 * @jest-environment node
 */
// the above makes it so window is not defined (needs to be at the top of the file)
// test to make sure detect-it doesn't error if no window
// the below results are the default when no window

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
