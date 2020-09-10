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

function determineDeviceType(hasTouch, anyHover, anyFine, state) {
  // A hybrid device is one that both hasTouch and any input device can hover
  // or has a fine pointer.
  if (hasTouch && (anyHover || anyFine)) return 'hybrid';

  // workaround for browsers that have the touch events api,
  // and have implemented Level 4 media queries but not the
  // hover and pointer media queries, so the tests are all false (notable Firefox)
  // if it hasTouch, no pointer and hover support, and on an android assume it's touchOnly
  // if it hasTouch, no pointer and hover support, and not on an android assume it's a hybrid
  if (hasTouch &&
  Object.keys(state.detectHover).filter(key => key !== 'update').every(key => state.detectHover[key] === false) &&
  Object.keys(state.detectPointer).filter(key => key !== 'update').every(key => state.detectPointer[key] === false)) {
    if (window.navigator && /android/.test(window.navigator.userAgent.toLowerCase())) {
      return 'touchOnly';
    }
    return 'hybrid';
  }

  // In almost all cases a device that doesn’t support touch will have a mouse,
  // but there may be rare exceptions. Note that it doesn’t work to do additional tests
  // based on hover and pointer media queries as older browsers don’t support these.
  // Essentially, 'mouseOnly' is the default.
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

      detectIt.hasTouch = detectIt.state.detectTouchEvents.hasSupport || false;

      detectIt.deviceType = determineDeviceType(
        detectIt.hasTouch,
        detectIt.state.detectHover.anyHover,
        detectIt.state.detectPointer.anyFine,
        detectIt.state,
      );

      detectIt.hasMouse = detectIt.deviceType !== 'touchOnly';

      detectIt.primaryInput =
        (detectIt.deviceType === 'mouseOnly' && 'mouse') ||
        (detectIt.deviceType === 'touchOnly' && 'touch') ||
        // deviceType is hybrid:
        (detectIt.state.detectPointer.fine && 'mouse') ||
        (detectIt.state.detectPointer.coarse && 'touch') ||
        // if there's no support for hover media queries but detectIt determined it's
        // a hybrid  device, then assume it's a mouse first device
        'mouse';

      // issue with Windows Chrome on hybrid devices starting in version 59 where
      // media queries represent a touch only device, so if the browser is an
      // affected Windows Chrome version and hasTouch,
      // then assume it's a hybrid with primaryInput mouse
      // note that version 62 of Chrome fixes this issue
      // see https://github.com/rafgraph/detect-it/issues/8
      const inVersionRange = version => version >= 59 && version < 62;
      const isAffectedWindowsChromeVersion =
        /windows/.test(window.navigator.userAgent.toLowerCase()) &&
        /chrome/.test(window.navigator.userAgent.toLowerCase()) &&
        inVersionRange(parseInt(/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1], 10));

      if (isAffectedWindowsChromeVersion && detectIt.hasTouch) {
        detectIt.deviceType = 'hybrid';
        detectIt.hasMouse = true;
        detectIt.primaryInput = 'mouse';
      }
    }
  },
};

detectIt.updateOnlyOwnProperties();
export default detectIt;
