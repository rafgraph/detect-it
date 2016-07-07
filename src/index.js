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
      this.deviceType = true; // TODO
      this.touchEventsApi = detectTouchEvents.hasApi;
      this.pointerEventsApi = detectPointerEvents.hasApi;
      this.pointerEventsPrefix = detectPointerEvents.prefix;
      this.maxTouchPoints = true; // TODO
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
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPointerEvents,
  },
};

detectIt.updateOnlyOwnProperties();
export default detectIt;
