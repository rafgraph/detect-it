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
      this.maxTouchPoints = (() => {
        function isNum(value) { return typeof value === 'number'; }
        const dtePts = this.state.detectTouchEvents.maxTouchPoints;
        const dpePts = this.state.detectPointerEvents.maxTouchPoints;
        if (isNum(dtePts) && isNum(dpePts)) return Math.max(dtePts, dpePts);
        if (isNum(dtePts)) return dtePts;
        if (isNum(dpePts)) return dpePts;
        return undefined;
      })();
      this.primaryHover =
        (detectHover.hover && 'hover') ||
        (detectHover.none && 'none') ||
        (detectHover.onDemand && 'onDemand');
      this.primaryPointer =
        (detectPointer.fine && 'fine') ||
        (detectPointer.coarse && 'coarse') ||
        (detectPointer.none && 'none');
    }

    // function determineMaxTouchPoints() {
    //   function isNum(value) { return typeof value === 'number'; }
    //   const dtePts = detectIt.state.detectTouchEvents.maxTouchPoints;
    //   const dpePts = detectPointerEvents.maxTouchPoints;
    //   if (isNum(dtePts) && isNum(dpePts)) return Math.max(dtePts, dpePts);
    //   if (isNum(dtePts)) return dtePts;
    //   if (isNum(dpePts)) return dpePts;
    //   return undefined;
    // }
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
