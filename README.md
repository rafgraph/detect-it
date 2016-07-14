# Detect It

Detect if a device is mouse only, touch only, or hybrid.

[Live detection test][liveDetectionTest] &#8212; [view on npm][onNpm]

Exports a reference to a singleton object (a micro state machine with an update function) with its state set to if the device is mouse only, touch only, or hybrid (and other related info about the device, see the `detectIt` micro state machine section below for details), as well as an `update()` function which updates the object's state.

`detect-it`'s state is a deterministic function of the state of the four micro state machines that it encapsulates ([`detect-hover`][detectHoverRepo], [`detect-pointer`][detectPointerRepo], [`detect-touch-events`][detectTouchEventsRepo], and [`detect-pointer-events`][detectPointerEventsRepo]). `detect-it`'s `update()` function first runs the `update()` function on each micro state machine that it encapsulates, and then updates it own state.


## `detectIt` micro state machine
```javascript
const detectIt = {
  /*
   * detectIt's state is a deterministic function of the state
   * of the four micro state machines it encapsulates
   */
  deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
  hasTouchEventsApi: boolean,
  hasPointerEventsApi: boolean,
  maxTouchPoints: whole number,
  primaryHover: 'hover' / 'none',
  primaryPointer: 'fine' / 'coarse' / 'none',


  // access to the four micro state machines that detectIt encapsulates
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPointerEvents,
  },

  // updates the state of the four micro state machines it encapsulates, and then updates its own state
  update() {...},

  // easy access to detectPointerEvents' prefix function
  pointerEventsPrefix(value) {...},
}
```

## Installing `detect-it`
```terminal
$ npm install detect-it
```

## Importing `detect-it`
```javascript
import detectIt from 'detect-it';
```


## Using `detect-it`
```javascript
// using the state
detectIt.deviceType === 'mouseOnly' / 'touchOnly' / 'hybrid'; // the device type

detectIt.hasTouchEventsApi === true; // the browser supports the touch events api
detectIt.hasPointerEventsApi === true; // the browser supports the pointer events api
detectIt.maxTouchPoints; // max number of touch points supported if the device is touchOnly or hybrid

detectIt.primaryHover === 'hover' / 'none'; // can the primary pointing system easily hover
detectIt.primaryPointer === 'fine' / `coarse` / 'none'; // how accurate is the primary pointing system


// accessing the state of the micro state machines that detectIt encapsulates
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
  maxTouchPoints: undefined,
  primaryHover: 'none',
  primaryPointer: 'coarse',
}
```

Note that the `update()` function is run once at the time of import to set the object's initial state, and generally doesn't need to be run again. If it doesn't have access to the `window`, then the state will be `undefined` (`detect-it` will not throw an error), and you will have to call the `update()` function manually at a later time to update its state.


## Part of the `detect-it` family
- **`detect-it`**
  - [`detect-hover`][detectHoverRepo]
  - [`detect-pointer`][detectPointerRepo]
  - [`detect-touch-events`][detectTouchEventsRepo]
  - [`detect-pointer-events`][detectPointerEventsRepo]


<!-- links -->
[liveDetectionTest]: http://detect-it.rafrex.com/
[onNpm]: https://www.npmjs.com/package/detect-it
[detectHoverRepo]: https://github.com/rafrex/detect-hover
[detectPointerRepo]: https://github.com/rafrex/detect-pointer
[detectTouchEventsRepo]: https://github.com/rafrex/detect-touch-events
[detectPointerEventsRepo]: https://github.com/rafrex/detect-pointer-events
