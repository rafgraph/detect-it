#Detect It

Detect if a device is mouse only, touch only, or hybrid.

[Live detection test][liveDetectionTest] &#8212; [view on npm][onNpm]

Exports a reference to a singleton object (a micro state machine with an update function) with its state set to if the device is mouse only, touch only, or hybrid (and other related info about the device, see the `detectIt` micro state machine section below for details), as well as an `update()` function which updates the object's state.

`detect-it`'s state is a deterministic function of the state of the four micro state machines that it encapsulates ([`detect-hover`][detectHoverRepo], [`detect-pointer`][detectPointerRepo], [`detect-touch-events`][detectTouchEventsRepo], and [`detect-pointer-events`][detectPointerEventsRepo]). `detect-it`'s `update()` function first runs the `update()` function on each the micro state machines it encapsulates, and then updates it own state.


## `detectIt` micro state machine
```javascript
const detectIt = {
  /*
   * detect-it's state is a deterministic function
   * of the four micro state machines it encapsulates
   */
  deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
  touchEventsApi: boolean,
  pointerEventsApi: boolean,
  maxTouchPoints: whole number,
  primaryHover: 'hover' / 'none',
  primaryPointer: 'fine' / 'coarse' / 'none',

  /*
   * access to the four micro state machines that detect-it encapsulates:
   * detect-hover, detect-pointer, detect-touch-events, and detect-pointer-events
   */
  state: {
    detectHover,
    detectPointer,
    detectTouchEvents,
    detectPointerEvents,
  },

  /*
   * updates the state of the four micro state machines it encapsulates,
   * and then updates its own state
   */
  update() {...},

  // easy access to detect-pointer-events' prefix function
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
detectIt.touchEventsApi === true; // the browser responds to the touch events api
detectIt.pointerEventsApi === true; // the browser responds to the pointer events api
detectIt.maxTouchPoints; // maximum number of touch points supported by the device if it is a touchOnly or hybrid device
detectIt.primaryHover === 'hover' / 'none'; // can the primary pointing system easily hover
detectIt.primaryPointer === 'fine' / `coarse` / 'none'; // how accurate is the primary pointing system


// accessing the state of the micro state machines that detect-it encapsulates
detectIt.state.detectHover; // see the detect-hover repo for info on detectHover's state
detectIt.state.detectPointer; // see the detect-pointer repo for info on detectPointer's state
detectIt.state.detectTouchEvents; // see the detect-touch-events repo for info on detectTouchEvents' state
detectIt.state.detectPointerEvents; // see the detect-pointer-events repo for info on detectPointerEvents' state


// updating the state - most apps won't need to use this at all
detectIt.update();

// prefixing pointer events
detectIt.pointerEventsPrefix(value) // returns the value and only adds the prefix if it is required

// for example, this will add an event listener for 'MSPointerDown' if a prefix is required,
// otherwise it will add an event listener for 'pointerdown'
element.addEventListener(detectIt.pointerEventsPrefix('pointerdown'), function...)
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
