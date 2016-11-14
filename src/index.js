import detectHover from 'detect-hover';
import detectPointer from 'detect-pointer';
import detectTouchEvents from 'detect-touch-events';
import detectPassiveEvents from 'detect-passive-events';

/*
 * detectIt object structure
 * const detectIt = {
 *   deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
 *   passiveEvents: boolean,
 *   hasTouch: boolean,
 *   hasMouse: boolean,
 *   maxTouchPoints: number,
 *   primaryHover: 'hover' / 'none',
 *   primaryPointer: 'fine' / 'coarse' / 'none',
 *   state: {
 *     detectHover,
 *     detectPointer,
 *     detectTouchEvents,
 *     detectPassiveEvents,
 *   },
 *   update() {...},
 * }
 */

function determineDeviceType(hasTouch, anyHover, anyFine) {
  /*
   * A hybrid device is one that both hasTouch and any input device can hover
   * or has a fine pointer.
   */
  if (hasTouch && (anyHover || anyFine)) return 'hybrid';

  /*
   * In almost all cases a device that doesn’t support touch will have a mouse,
   * but there may be rare exceptions. Note that it doesn’t work to do additional tests
   * based on hover and pointer media queries as older browsers don’t support these.
   * Essentially, 'mouseOnly' is the default.
   */
  return hasTouch ? 'touchOnly' : 'mouseOnly';
}

const detectIt = {
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPassiveEvents,
  },
  update() {
    detectIt.state.detectHover.update();
    detectIt.state.detectPointer.update();
    detectIt.state.detectTouchEvents.update();
    detectIt.state.detectPassiveEvents.update();
    detectIt.updateOnlyOwnProperties();
  },
  updateOnlyOwnProperties() {
    if (typeof window !== 'undefined') {
      detectIt.passiveEvents = detectIt.state.detectPassiveEvents.hasSupport || false;

      detectIt.hasTouch = detectIt.state.detectTouchEvents.hasApi || false;

      detectIt.deviceType = determineDeviceType(
        detectIt.hasTouch,
        detectIt.state.detectHover.anyHover,
        detectIt.state.detectPointer.anyFine,
      );

      detectIt.hasMouse = detectIt.deviceType !== 'touchOnly';
      detectIt.maxTouchPoints = detectIt.state.detectTouchEvents.maxTouchPoints;

      detectIt.primaryHover =
        (detectIt.state.detectHover.hover && 'hover') ||
        (detectIt.state.detectHover.none && 'none') ||
        // if it's a mouseOnly device that doesn't support level 4 media queries,
        // then assume it hovers
        (detectIt.deviceType === 'mouseOnly' && 'hover') ||
        // if it's a touchOnly device that doesn't support level 4 media queries,
        // then assume it doesn't hover, otherwise it's undefined
        (detectIt.deviceType === 'touchOnly' && 'none') || undefined;

      detectIt.primaryPointer =
        (detectIt.state.detectPointer.fine && 'fine') ||
        (detectIt.state.detectPointer.coarse && 'coarse') ||
        (detectIt.state.detectPointer.none && 'none') ||
        // if it's a mouseOnly device that doesn't support level 4 media queries,
        // then assume it has a fine pointer
        (detectIt.deviceType === 'mouseOnly' && 'fine') ||
        // if it's a touchOnly device that doesn't support level 4 media queries,
        // then assume it has a coarse pointer, otherwise it's undefined
        (detectIt.deviceType === 'touchOnly' && 'coarse') || undefined;
    }
  },
};

detectIt.updateOnlyOwnProperties();
export default detectIt;
