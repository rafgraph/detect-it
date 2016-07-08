import detectHover from 'detect-hover';
import detectPointer from 'detect-pointer';
import detectTouchEvents from 'detect-touch-events';
import detectPointerEvents from 'detect-pointer-events';

/**
 * detectIt object structure
 * const detectIt = {
 *   deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
 *   touchEventsApi: boolean,
 *   pointerEventsApi: boolean,
 *   pointerEventsPrefix(value) {return value, value will only have prefix if requiresPrefix},
 *   maxTouchPoints: number,
 *   primaryHover: 'hover' / 'none' / 'onDemand',
 *   primaryPointer: 'fine' / 'coarse' / 'none',
 *   state: {
 *     detectHover,
 *     detectPointer,
 *     detectTouchEvents,
 *     detectPointerEvents,
 *   },
 *   update() {...},
 * }
 */

function robustMax(a, b) {
  function isNum(value) { return typeof value === 'number'; }
  if (isNum(a) && isNum(b)) return Math.max(a, b);
  if (isNum(a)) return a;
  if (isNum(b)) return b;
  return undefined;
}

function determineDeviceType(hasTouch, anyHover, anyFine) {
  /*
   * A hybrid device is one that both hasTouch and any input device can either hover
   * or has a fine pointer. For example, the Galaxy Note with stylus registers
   * that one of it's input devices has a fine pointer (i.e. the stylus), but
   * only that it can hover on-demand (which can't be used as a determinant because
   * all Android touch only devices also say they can hover on-demand
   * because a hover state can be activated on Android via a long press)
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
  update() {
    detectHover.update();
    detectPointer.update();
    detectTouchEvents.update();
    detectPointerEvents.update();
    this.updateOnlyOwnProperties();
  },
  updateOnlyOwnProperties() {
    if (typeof window !== 'undefined') {
      this.deviceType = determineDeviceType(
        (this.state.detectTouchEvents.hasApi || this.state.detectPointerEvents.hasTouch),
        this.state.detectHover.anyHover,
        this.state.detectPointer.anyFine
      );
      this.touchEventsApi = detectTouchEvents.hasApi;
      this.pointerEventsApi = detectPointerEvents.hasApi;
      this.maxTouchPoints = robustMax(
        this.state.detectTouchEvents.maxTouchPoints,
        this.state.detectPointerEvents.maxTouchPoints
      );
      this.primaryHover =
        (detectHover.hover && 'hover') ||
        (detectHover.none && 'none') ||
        (detectHover.onDemand && 'onDemand');
      this.primaryPointer =
        (detectPointer.fine && 'fine') ||
        (detectPointer.coarse && 'coarse') ||
        (detectPointer.none && 'none');
    }
  },
  pointerEventsPrefix: this.state.detectPointerEvents.prefix,
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPointerEvents,
  },
};

detectIt.updateOnlyOwnProperties();
export default detectIt;
