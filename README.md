# Detect It

Detect if a device is mouse only, touch only, or hybrid, and if it supports passive event listeners.

[Live detection test][liveDetectionTest]

Exports a reference to a singleton object (a micro state machine with an update function) with its state set to if the device is mouse only, touch only, or hybrid (and other related info about the device), as well as an `update()` function which updates the object's state.

`detect-it`'s state is based on the state of the four micro state machines that it contains ([`detect-hover`][detectHoverRepo], [`detect-pointer`][detectPointerRepo], [`detect-touch-events`][detectTouchEventsRepo], and [`detect-passive-events`][detectPassiveEventsRepo]). `detect-it`'s `update()` function first runs the `update()` function on each micro state machine that it contains, and then updates it own state.

Note that Detect It has removed support for Pointer Events detection because they're just not relevant enough (support for less than 60% of users, [see Can I Use][canIUsePointerEvents], and not supported by React). If you need Pointer Events detection, use [Detect It v1.1][detectItv1.1].

### `detectIt` micro state machine
```javascript
const detectIt = {
  deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
  passiveEvents: true / false,
  hasMouse: true / false,
  hasTouch: true / false,
  primaryInput: 'mouse' / 'touch',

  // access to the four micro state machines that it contains
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPassiveEvents,
  },

  // updates the state of the four micro state machines it contains, and then updates its own state
  update() {...},
}
```

### Installing `detect-it`
```terminal
$ yarn add detect-it
# OR
$ npm install --save detect-it
```

### Using `detect-it`
```javascript
import detectIt from 'detect-it';
```
```javascript
// using the state
detectIt.deviceType === 'mouseOnly' / 'touchOnly' / 'hybrid'; // the device type

detectIt.passiveEvents === true; // the browser supports passive event listeners

detectIt.hasMouse === true; // the deviceType is mouseOnly or hybrid

// the browser supports the touch events api, and the deviceType is touchOnly or hybrid
detectIt.hasTouch === true;

detectIt.primaryInput === 'mouse' / 'touch'; // the primary input type


// accessing the state of the micro state machines that detectIt contains
detectIt.state.detectHover; // see the detect-hover repo for more info
detectIt.state.detectPointer; // see the detect-pointer repo for more info
detectIt.state.detectTouchEvents; // see the detect-touch-events repo for more info
detectIt.state.detectPassiveEvents; // see the detect-passive-events repo for more info


// updating the state - most apps won't need to use this at all
detectIt.update();
```

```javascript
// note that in the case of a legacy computer and browser, one that
// doesn't support any of detect-it's detection tests, the default state will be:
const detectIt = {
  deviceType: 'mouseOnly',
  passiveEvents: false,
  hasMouse: true,
  hasTouch: false,
  primaryInput: 'mouse',
}

// note that in the case of a legacy touch device, one that supports the touch events api,
// but not any of the other detection tests, the default state will be:
const detectIt = {
  deviceType: 'touchOnly',
  passiveEvents: false,
  hasMouse: false,
  hasTouch: true,
  primaryInput: 'touch',
}
```

Note that the `update()` function is run once at the time of import to set the object's initial state, and generally doesn't need to be run again. If it doesn't have access to the `window`, then the state will be `undefined` (`detect-it` will not throw an error), and you will have to call the `update()` function manually at a later time to update its state.

#### Using `detect-it` to set event listeners
```javascript
// if passive events are supported by the browser
if (detectIt.passiveEvents === true) {
  document.addEventListener('scroll', handleScroll, { capture: false, passive: true });
} else {
  document.addEventListener('scroll', handleScroll, false);
}

if (detectIt.hasMouse) {
  // set mouse event listeners
}
if (detectIt.hasTouch) {
  // set touch event listeners
}

// OR

if (detectIt.deviceType === 'mouseOnly') {
  // only set mouse event listeners
}
if (detectIt.deviceType === 'touchOnly') {
  // only set touch event listeners
}
if (detectIt.deviceType === 'hybrid') {
  // set both mouse and touch event listeners
}
```

#### Real world example using `detect-it`
- [React Interactive][reactInteractive] - a better interactive state machine than CSS

### Part of the `detect-it` family
- **`detect-it`**
  - [`detect-hover`][detectHoverRepo]
  - [`detect-pointer`][detectPointerRepo]
  - [`detect-touch-events`][detectTouchEventsRepo]
  - [`detect-passive-events`][detectPassiveEventsRepo]

### For more information
- `hover` and `any-hover` media queries see the [W3C Media Queries Level 4 specification, hover section][w3cMediaQueriesSpecLatestHover]
- `pointer` and `any-pointer` media queries see the [W3C Media Queries Level 4 specification, pointer section][w3cMediaQueriesSpecLatestPointer]
- Touch events api see [MDN's Touch Events][mdnTouchEvents], or the [W3C Touch Events specification][w3cTouchEventsSpecLatest]
- General playground see the excellent suite of [touch/pointer tests and demos][touchTests] put together by Patrick H. Lauke
- Passive events see this [Passive Events Explainer][passiveExplainer]

### Notes about detecting the `deviceType`
I chose a wide definition for what constitutes a `hybrid` device, or rather a strict definition for what are `mouseOnly` and `touchOnly` devices, because if a device strays from a fine point and hover with a mouse, or a coarse touch with a finger, then it should be treated uniquely when considering how the user will interact with it, and so is placed in the broad `hybrid` category.

```javascript
// this is the function used by detect-it to determine the device type
function determineDeviceType(hasTouch, anyHover, anyFine) {
  // A hybrid device is one that both hasTouch and any input device can hover
  // or has a fine pointer.
  if (hasTouch && (anyHover || anyFine)) return 'hybrid';

  // In almost all cases a device that doesn’t support touch will have a mouse,
  // but there may be rare exceptions. Note that it doesn’t work to do additional tests
  // based on hover and pointer media queries as older browsers don’t support these.
  // Essentially, 'mouseOnly' is the default.
  return hasTouch ? 'touchOnly' : 'mouseOnly';
}
```

Some `hybrid` examples:
- A touch capable Chromebook with Chrome browser registers that `hasTouch`, `anyHover`, and `anyFine` are all true.
- The Galaxy Note with stylus running the Chrome mobile browser registers that `hasTouch` and `anyFine` are true, but that `anyHover` is false.
- The Microsoft Surface (and other Windows 10 touchscreen computers)
  - When using the Chrome browser, `hasTouch`, `anyHover` and `anyFine` are all true because Chrome supports the Touch Events API, so the device registers as a `hybrid`.
  - When using Microsoft's Edge browser `hasTouch` is false because Edge doesn't support the Touch Events API, so it registers as a `mouseOnly` device. To access the touch capabilities in Edge you have to use Pointer Events. If you want Edge to register as a `hybrid` device then use [Detect It v1.1][detectItv1.1] which supports Pointer Events. Note that touches will still fire mouse events, so if you don't set Pointer Event listeners, touch input will act like a mouse.

<!-- links -->
[liveDetectionTest]: http://detect-it.rafrex.com/

[detectHoverRepo]: https://github.com/rafrex/detect-hover
[detectPointerRepo]: https://github.com/rafrex/detect-pointer
[detectTouchEventsRepo]: https://github.com/rafrex/detect-touch-events
[detectPassiveEventsRepo]: https://github.com/rafrex/detect-passive-events
[detectItv1.1]: https://github.com/rafrex/detect-it/tree/v1.1.0

[reactInteractive]: https://github.com/rafrex/react-interactive
[theListener]: https://github.com/rafrex/the-listener
[currentInput]: https://github.com/rafrex/current-input

[canIUsePointerEvents]: http://caniuse.com/#feat=pointer
[w3cMediaQueriesSpecLatestHover]: https://www.w3.org/TR/mediaqueries-4/#hover
[w3cMediaQueriesSpecLatestPointer]: https://www.w3.org/TR/mediaqueries-4/#pointer
[mdnTouchEvents]: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
[w3cTouchEventsSpecLatest]: https://w3c.github.io/touch-events/

[touchTests]: https://patrickhlauke.github.io/touch/
[passiveExplainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
