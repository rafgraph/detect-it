# Detect It

Detect if a device is mouse only, touch only, or hybrid.

[Live detection test][liveDetectionTest]

Exports a reference to a singleton object (a micro state machine with an update function) with its state set to if the device is mouse only, touch only, or hybrid (and other related info about the device), as well as an `update()` function which updates the object's state.

`detect-it`'s state is a deterministic function of the state of the four micro state machines that it contains ([`detect-hover`][detectHoverRepo], [`detect-pointer`][detectPointerRepo], [`detect-touch-events`][detectTouchEventsRepo], and [`detect-pointer-events`][detectPointerEventsRepo]). `detect-it`'s `update()` function first runs the `update()` function on each micro state machine that it contains, and then updates it own state.


### `detectIt` micro state machine
```javascript
const detectIt = {
  deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
  hasTouchEventsApi: boolean,
  hasPointerEventsApi: boolean,
  hasTouch: boolean,
  maxTouchPoints: whole number,
  primaryHover: 'hover' / 'none',
  primaryPointer: 'fine' / 'coarse' / 'none',

  // access to the four micro state machines that it contains
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPointerEvents,
  },

  // updates the state of the four micro state machines it contains, and then updates its own state
  update() {...},

  // easy access to detectPointerEvents' prefix function
  pointerEventsPrefix(value) {...},
}
```

### Installing `detect-it`
```terminal
$ npm install detect-it
```

### Using `detect-it`
```javascript
import detectIt from 'detect-it';
```
```javascript
// using the state
detectIt.deviceType === 'mouseOnly' / 'touchOnly' / 'hybrid'; // the device type

detectIt.hasTouchEventsApi === true; // the browser supports the touch events api
detectIt.hasPointerEventsApi === true; // the browser supports the pointer events api

detectIt.hasTouch === true; // this is a touch capable device (no inference about api)
detectIt.maxTouchPoints; // max number of touch points supported

detectIt.primaryHover === 'hover' / 'none'; // can the primary pointing system easily hover
detectIt.primaryPointer === 'fine' / `coarse` / 'none'; // how accurate is the primary pointing system


// accessing the state of the micro state machines that detectIt contains
detectIt.state.detectHover; // see the detect-hover repo for more info
detectIt.state.detectPointer; // see the detect-pointer repo for more info
detectIt.state.detectTouchEvents; // see the detect-touch-events repo for more info
detectIt.state.detectPointerEvents; // see the detect-pointer-events repo for more info


// updating the state - most apps won't need to use this at all
detectIt.update();

// prefixing pointer events
detectIt.pointerEventsPrefix(value) // returns the value and only adds the prefix if it is required

// for example, this will add an event listener for 'MSPointerDown' if a prefix is required,
// otherwise it will add an event listener for 'pointerdown'
element.addEventListener(detectIt.pointerEventsPrefix('pointerdown'), function...)
```

```javascript
/*
 * note that in the case of a legacy computer and browser, one that
 * doesn't support any of detect-it's detection tests, the default state will be:
 */
const detectIt = {
  deviceType: 'mouseOnly',
  hasTouchEventsApi: false,
  hasPointerEventsApi: false,
  hasTouch: false,
  maxTouchPoints: undefined,
  primaryHover: 'hover',
  primaryPointer: 'fine',
}

/*
 * note that in the case of a legacy touch device, one that supports the touch events api,
 * but not any of the other detection tests, the default state will be:
 */
const detectIt = {
  deviceType: 'touchOnly',
  hasTouchEventsApi: true,
  hasPointerEventsApi: false,
  hasTouch: true,
  maxTouchPoints: undefined,
  primaryHover: 'none',
  primaryPointer: 'coarse',
}
```

### Part of the `detect-it` family
- **`detect-it`**
  - [`detect-hover`][detectHoverRepo]
  - [`detect-pointer`][detectPointerRepo]
  - [`detect-touch-events`][detectTouchEventsRepo]
  - [`detect-pointer-events`][detectPointerEventsRepo]

### For more information
- `hover` and `any-hover` media queries see the [W3C Media Queries Level 4 specification, hover section][w3cMediaQueriesSpecLatestHover]
- `pointer` and `any-pointer` media queries see the [W3C Media Queries Level 4 specification, pointer section][w3cMediaQueriesSpecLatestPointer]
- Touch events api see [MDN's Touch Events][mdnTouchEvents], or the [W3C Touch Events specification][w3cTouchEventsSpecLatest]
- Pointer events api see [MDN's Pointer Events][mdnPointerEvents], or the [W3C Pointer Events specification][w3cPointerEventsSpecLatest]

#### Thank you
The work put into `detect-it` was made much easier by the excellent suite of [touch/pointer tests and demos][touchTests] put together by [Patrick H. Lauke][patrickHLauke]

### Notes about detecting the `deviceType`
I chose a wide definition for what constitutes a `hybrid` device, or rather a strict definition for what are `mouseOnly` and `touchOnly` devices, because if a device strays from a fine point and hover with a mouse, or a coarse touch with a finger, then it should be treated uniquely when considering how the user will interact with it, and so is placed in the broad `hybrid` category.

```javascript
// this is the function used by detect-it to determine the device type
function determineDeviceType(hasTouch, anyHover, anyFine) {
  /*
   * A hybrid device is one that both hasTouch and any input device can hover
   * or has a fine pointer. Note that hasTouch only reflects the capabilities
   * of the device, but provides no inference about the api.
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
```

<!-- links -->
[liveDetectionTest]: http://detect-it.rafrex.com/

[detectHoverRepo]: https://github.com/rafrex/detect-hover
[detectPointerRepo]: https://github.com/rafrex/detect-pointer
[detectTouchEventsRepo]: https://github.com/rafrex/detect-touch-events
[detectPointerEventsRepo]: https://github.com/rafrex/detect-pointer-events

[w3cMediaQueriesSpecLatestHover]: https://www.w3.org/TR/mediaqueries-4/#hover
[w3cMediaQueriesSpecLatestPointer]: https://www.w3.org/TR/mediaqueries-4/#pointer
[mdnTouchEvents]: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
[w3cTouchEventsSpecLatest]: https://w3c.github.io/touch-events/
[w3cPointerEventsSpecLatest]: https://www.w3.org/TR/pointerevents/
[mdnPointerEvents]: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

[touchTests]: https://patrickhlauke.github.io/touch/
[patrickHLauke]: https://github.com/patrickhlauke
