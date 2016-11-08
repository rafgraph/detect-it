# Detect It

Detect if a device is mouse only, touch only, or hybrid.

[Live detection test][liveDetectionTest]

Exports a reference to a singleton object (a micro state machine with an update function) with its state set to if the device is mouse only, touch only, or hybrid (and other related info about the device), as well as an `update()` function which updates the object's state.

`detect-it`'s state is a deterministic function of the state of the five micro state machines that it contains ([`detect-hover`][detectHoverRepo], [`detect-pointer`][detectPointerRepo], [`detect-touch-events`][detectTouchEventsRepo], [`detect-pointer-events`][detectPointerEventsRepo], and [`detect-passive-events`][detectPassiveEventsRepo]). `detect-it`'s `update()` function first runs the `update()` function on each micro state machine that it contains, and then updates it own state.


### `detectIt` micro state machine
```javascript
const detectIt = {
  deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
  passiveEvents: boolean,
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
    detectPassiveEvents,
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

detectIt.passiveEvents === true // the browser supports passive event listeners

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
  passiveEvents: false,
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
  passiveEvents: false,
  hasTouchEventsApi: true,
  hasPointerEventsApi: false,
  hasTouch: true,
  maxTouchPoints: undefined,
  primaryHover: 'none',
  primaryPointer: 'coarse',
}
```

Note that the `update()` function is run once at the time of import to set the object's initial state, and generally doesn't need to be run again. If it doesn't have access to the `window`, then the state will be `undefined` (`detect-it` will not throw an error), and you will have to call the `update()` function manually at a later time to update its state.

#### Using `detect-it` to set event listeners (or just use [`the-listener`][theListener])
```javascript
const dIt = detectIt;

// if passive events are supported by the browser
if (dIt.passiveEvents === true) {
  document.addEventListener('scroll', handleScroll, { capture: false, passive: true });
} else {
  document.addEventListener('scroll', handleScroll, false);
}

// using mouse and touch events
if (dIt.deviceType === 'mouseOnly') {
  // only set mouse event listeners
}
if (dIt.deviceType === 'touchOnly' && dIt.hasTouchEventsApi) {
  // only set touch event listeners
}
if (dIt.deviceType === 'hybrid' && dIt.hasTouchEventsApi) {
  // set both mouse and touch event listeners
}

// note that there are cases where a touch capable device only fires pointer events
if (dIt.hasTouch && dIt.hasPointerEventsApi && !dIt.hasTouchEventsApi) {
  // must set pointer event listeners to access touch capabilities of device
  // note that dIt.hasTouch includes all touchOnly and hybrid devices
  // (you could be more specific and just target touchOnly or hybrid devices instead)
}

// using pointer events
if (dIt.hasPointerEventsApi) {
  // can set only pointer event listeners instead mouse and touch event listeners
}
if (dIt.deviceType === 'mouseOnly' && dIt.hasPointerEventsApi) {
  // can set only pointer event listeners knowing that the pointerType will only be mouse
  // (or can just set mouse event listeners instead of pointer event listeners)
}
if (dIt.deviceType === 'touchOnly' && dIt.hasPointerEventsApi) {
  // only set pointer event listeners knowing that pointerType will be pen or touch
  // (if the browser also hasTouchEventsApi, set either pointer or touch event listeners)
}
if (dIt.deviceType === 'hybrid' && dIt.hasPointerEventsApi) {
  // only set pointer event listeners knowing that pointerType could be mouse, pen, or touch
}
```

#### Using `detect-it` to adjust the user interface
```javascript
const dIt = detectIt;

if (dIt.primaryPointer === 'coarse') {
  // make clickable elements bigger
}

if (dIt.primaryHover === 'hover') {
  // can add hover features
}
```

#### Real world examples using `detect-it`
- [`react-interactive`][reactInteractive] - a better interactive state machine than css
- [`the-listener`][theListener] - easily set complex mouse, touch and pointer listeners without conflicts
- [`current-input`][currentInput] - detect the current input (mouse or touch) and fix the sticky hover problem on touch devices

### Part of the `detect-it` family
- **`detect-it`**
  - [`detect-hover`][detectHoverRepo]
  - [`detect-pointer`][detectPointerRepo]
  - [`detect-touch-events`][detectTouchEventsRepo]
  - [`detect-pointer-events`][detectPointerEventsRepo]
  - [`detect-passive-events`][detectPassiveEventsRepo]

### For more information
- `hover` and `any-hover` media queries see the [W3C Media Queries Level 4 specification, hover section][w3cMediaQueriesSpecLatestHover]
- `pointer` and `any-pointer` media queries see the [W3C Media Queries Level 4 specification, pointer section][w3cMediaQueriesSpecLatestPointer]
- Touch events api see [MDN's Touch Events][mdnTouchEvents], or the [W3C Touch Events specification][w3cTouchEventsSpecLatest]
- Pointer events api see [MDN's Pointer Events][mdnPointerEvents], or the [W3C Pointer Events specification][w3cPointerEventsSpecLatest]
- General playground see the excellent suite of [touch/pointer tests and demos][touchTests] put together by Patrick H. Lauke
- Passive events see this [Passive Events Explainer][passiveExplainer]

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

Some `hybrid` examples:
- A touch capable Chromebook with Chrome browser registers that `hasTouch`, `anyHover`, and `anyFine` are all true (and that `hasTouchEventsApi` is true).
- The Galaxy Note with stylus running the Chrome mobile browser registers that `hasTouch` and `anyFine` are true, but that `anyHover` is false (and that `hasTouchEventsApi` is true) - as a side note I think that since the stylus hovers effectively, the Note should register as `anyHover` true, but for some reason it doesn't.
- The Microsoft Surface (and other Windows 10 touchscreen computers) register that `hasTouch`, `anyHover` and `anyFine` are all true for both Microsoft Edge and Chrome browsers (note that for the Edge browser `hasPointerEventsApi` is true, but `hasTouchEventsApi` is false, and for the Chrome browser `hasTouchEventsApi` is true, but `hasPointerEventsApi` is false).

<!-- links -->
[liveDetectionTest]: http://detect-it.rafrex.com/

[detectHoverRepo]: https://github.com/rafrex/detect-hover
[detectPointerRepo]: https://github.com/rafrex/detect-pointer
[detectTouchEventsRepo]: https://github.com/rafrex/detect-touch-events
[detectPassiveEventsRepo]: https://github.com/rafrex/detect-passive-events
[detectPointerEventsRepo]: https://github.com/rafrex/detect-pointer-events

[reactInteractive]: https://github.com/rafrex/react-interactive
[theListener]: https://github.com/rafrex/the-listener
[currentInput]: https://github.com/rafrex/current-input

[w3cMediaQueriesSpecLatestHover]: https://www.w3.org/TR/mediaqueries-4/#hover
[w3cMediaQueriesSpecLatestPointer]: https://www.w3.org/TR/mediaqueries-4/#pointer
[mdnTouchEvents]: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
[w3cTouchEventsSpecLatest]: https://w3c.github.io/touch-events/
[w3cPointerEventsSpecLatest]: https://www.w3.org/TR/pointerevents/
[mdnPointerEvents]: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

[touchTests]: https://patrickhlauke.github.io/touch/
[passiveExplainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
