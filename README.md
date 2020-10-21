# Detect It

Detect if a device is `mouseOnly`, `touchOnly`, or `hybrid`, and if the primary input is `mouse` or `touch`. Also detects if the browser supports the Pointer Events API, the Touch Events API, and passive event listeners. Detect It is tree-shakable and side-effect free.

This is useful for creating device responsive UX and responding to user interactions. When creating apps with device responsive UX it is important to know what the user can do. Can they hover? Can they swipe? Etc. Once it's known what the user can do, the next question is how does the app listen for user input. For example, it's not enough to know that the user is on a touch device, the app also needs to know how to listen for touch input, should the app set PointerEvent listeners or TouchEvent listeners? For more on this see the [Recommended usage](#recommended-usage) section.

---

[Live detection test](https://detect-it.rafgraph.dev) (code in the [demo repo](https://github.com/rafgraph/detect-it-demo))

[![npm](https://img.shields.io/npm/dm/detect-it?label=npm)](https://www.npmjs.com/package/detect-it) [![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/detect-it@next?color=purple)](https://bundlephobia.com/result?p=detect-it@next) ![npm type definitions](https://img.shields.io/npm/types/detect-it?color=blue)

---

> `detect-it` v4 is currently in pre-release, use the `@next` tag to install it, [v3 is available here](https://github.com/rafgraph/detect-it/tree/v3.0.7)

```
npm install --save detect-it@next
```

```js
import * as detectIt from 'detect-it';
// OR
import {
  deviceType,
  primaryInput,
  supportsPointerEvents,
  supportsTouchEvents,
  supportsPassiveEvents,
} from 'detect-it';
```

```js
// types
deviceType: 'mouseOnly' | 'touchOnly' | 'hybrid';
primaryInput: 'mouse' | 'touch';
supportsPointerEvents: boolean;
supportsTouchEvents: boolean;
supportsPassiveEvents: boolean;
```

---

### `deviceType`

**`mouseOnly` | `touchOnly` | `hybrid`**

Indicates if the the device is `mouseOnly`, `touchOnly` or `hybrid`. For info on how the detection works and how specific devices are classified see [Notes on detecting `deviceType`](#notes-on-detecting-devicetype).

```js
import { deviceType } from 'detect-it';

if (deviceType === 'hybrid') {
  // ensure the site is usable by both mouse and touch input
}
```

---

### `primaryInput`

**`mouse` | `touch`**

Indicates if the primary input for the device is `mouse` or `touch`. For more info on how to use `primaryInput` see the [Recommended usage](#recommended-usage) section.

```js
import { primaryInput } from 'detect-it';

if (primaryInput === 'touch') {
  // tailor UX for touch input
} else {
  // tailor UX for mouse input
}
```

---

### `supportsPointerEvents`

**`boolean`**

Indicates if the browser supports the Pointer Events API. See [MDN's Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) and the [W3C Pointer Events specification](https://www.w3.org/TR/pointerevents/) for more information on Pointer Events. See [Can I use](https://caniuse.com/mdn-api_pointerevent) for current support.

```js
import { supportsPointerEvents } from 'detect-it';

if (supportsPointerEvents) {
  element.addEventListener('pointerenter', handlePointerEnter, false);
}
```

---

### `supportsTouchEvents`

**`boolean`**

Indicates if the browser supports the Touch Events API. See [MDN's Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) and the [W3C Touch Events specification](https://w3c.github.io/touch-events/) for more information on Touch Events.

```js
import { supportsTouchEvents } from 'detect-it';

if (supportsTouchEvents) {
  element.addEventListener('touchstart', handleTouchStart, false);
}
```

---

### `supportsPassiveEvents`

**`boolean`**

Indicates if the browser supports passive event listeners. See this [Passive Events Explainer](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) for more information on passive events. See [Can I use](https://caniuse.com/passive-event-listener) for current support.

```js
import { supportsPassiveEvents } from 'detect-it';

if (supportsPassiveEvents) {
  // passive events are supported by the browser
  document.addEventListener('scroll', handleScroll, { capture: false, passive: true });
} else {
  // passive events are not supported by the browser
  document.addEventListener('scroll', handleScroll, false);
}
```

---

## Pre-built option served from Unpkg CDN

Optionally, instead of using `npm install` you can load Detect It directly in the browser. A minified UMD version is available from Unpkg for this purpose.

```html
<!-- in index.html -->
<script src="https://unpkg.com/detect-it/dist/detect-it.umd.min.js"></script>
```

```js
// it will be available on the window as detectIt
if (window.detectIt.primaryInput === 'touch') {
  // tailor UX for touch input
}
```

---

## Recommended usage

TL;DR:

- Use `primaryInput` for creating device responsive UX that optimizes the user experience for either `mouse` or `touch` input (note that the app should still be usable by both inputs). Use this along with classic responsive design that adapts to screen/window size to create a fully device responsive app.
- Listening for user interactions:
  - If the browser `supportsPointerEvents` then only set PointerEvent listeners and use [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType) to determine if the interaction was from `mouse` or `touch`.
  - Otherwise always set both MouseEvent and TouchEvent listeners and use [`event-from`](https://github.com/rafgraph/event-from) to ignore MouseEvents generated from touch input.

### Device responsive UX

Device responsive UX is about creating web apps that feel native on every device. This goes beyond classic responsive design, which only responds to the screen/window size, and includes how the user can interact with the app (the capabilities of the device). Can the user hover, swipe, long press, etc?

There are 3 parts of device responsive UX: **Size** (size of screen/window), **Can** (what the user can do/capabilities of the device), and **Is** (is the user hovering, touching, etc). **Size** and **Can** need to be known at render time (when the UI is rendered), and **Is** needs to be known at interaction time (when the user is interacting with the app).

- **Size**
  - This can be determined using media queries, for example `(max-width: 600px)`, either applied via CSS or in JavaScript by using something like [`react-media`](https://github.com/ReactTraining/react-media).
- **Can**
  - This is what **Detect It** is built for - knowing at render time what the capabilities of the device are (what can the user do). There are a number of ways that you could use `deviceType` or `primaryInput` to optimize the UX for the capabilities of the device, however, in most cases I've found it makes sense to just use `primaryInput` and optimize the UX for `mouse` or `touch`, while ensuring that the app is still usable by both inputs.
- Putting **Size** and **Can** together, my preferred approach is to optimize the UX for 4 scenarios:
  - Wide screen with `primaryInput` `mouse`: desktop/laptop with a normal window
  - Narrow screen and `primaryInput` `mouse`: desktop/laptop with a narrow window
  - Wide screen with `primaryInput` `touch`: tablet
  - Narrow screen with `primaryInput` `touch`: phone
- **Is**
  - Is the user hovering, touching, etc. To help with this I created [React Interactive]() which provides a callback for interactive state changes (`hover`, `mouseActive`, `touchActive`, `keyActive`) and allows you to style touch interactions in ways that are not possible with CSS pseudo selectors.

### Setting event listeners

Setting event listeners can be thought of as either setting PointerEvent listeners **_or_** setting MouseEvent and TouchEvent listeners. PointerEvents can do everything that MouseEvents and TouchEvents can do (and more), without having to worry about if a MouseEvent was caused by touch input and so should be ignored. It is recommended to use PointerEvents if they are supported.

#### PointerEvent listeners

If the browser `supportsPointerEvents` then only set PointerEvent listeners and use [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType) to determine if the interaction was from `mouse` or `touch`.

```js
import { supportsPointerEvents } from 'detect-it';

const handlePointerEnter = (e) => {
  if (e.pointerType === 'mouse') {
    // event from mouse input
  } else {
    // event from touch input
    // note that pointerType can be 'mouse', 'touch' or 'pen'
    // but in most situations it makes it makes sense to treat 'touch' and 'pen' as the same
  }
};

if (supportsPointerEvents) {
  element.addEventListener('pointerenter', handlePointerEnter, false);
} else {
  // set mouse and touch event listeners
}
```

#### MouseEvent and TouchEvent listeners

If the browser doesn't support PointerEvents, then there are a couple of ways to approach setting mouse and touch event listeners.

> Note that a touch interaction will fire TouchEvents as the interaction is in progress (finger on the screen), and then will fire MouseEvents after the touch interaction has finished (after the finger is removed from the screen) to support sites that only listen for MouseEvents.

**Option 1**: If the device is `mouseOnly` or `touchOnly` then only set mouse or touch listeners, and if the device is `hybrid` set both mouse and touch event listeners and ignore MouseEvents caused by touch input (you can use [`event-from`](https://github.com/rafgraph/event-from) for this).

**Option 2**: Always set both mouse and touch event listeners and use [`event-from`](https://github.com/rafgraph/event-from) to ignore MouseEvents from touch input.

I prefer option 2 as it's simpler to code and I haven't noticed any performance impact from setting extra listeners (note that setting TouchEvent listeners on a browser that doesn't support TouchEvents is fine, the browser will just ignore the event listeners).

```js
import { supportsPointerEvents } from 'detect-it';
import { eventFrom } from 'event-from';

const handleMouseEnter = (e) => {
  if (eventFrom(e) !== 'mouse') return;
  // code for handling mouse enter event from mouse input
};

const handleTouchStart = (e) => {
  // code for handling touch start from touch input
};

if (supportsPointerEvents) {
  // set pointer event listeners
} else {
  // PointerEvents are not supported so set both MouseEvent and TouchEvent listeners
  element.addEventListener('mouseenter', handleMouseEnter, false);
  element.addEventListener('touchstart', handleTouchStart, false);
}
```

---

## Notes on detecting `deviceType`

To determine the `deviceType` and `primaryInput` Detect It uses multiple API detections and media query results to triangulate what type of device is being used. The entire detection is done when the script is imported so the results are known at render time (Detect It doesn't set any event listeners).

Detect It has a wide definition for what constitutes a `hybrid` device, or rather a strict definition for what are `mouseOnly` and `touchOnly` devices, because if a device strays from only a fine point and hover with a mouse, or a coarse touch with a finger, then it should be treated uniquely when considering how the user will interact with it. Below is the source code for determining `deviceType`:

```js
// a hybrid device is one that both hasTouch and
// any input can hover or has a fine pointer, or the primary pointer is not coarse
// if it's not a hybrid, then if it hasTouch it's touchOnly, otherwise it's mouseOnly
export const deviceType =
  hasTouch && (hasAnyHoverOrAnyFinePointer || !hasCoarsePrimaryPointer)
    ? 'hybrid'
    : hasTouch
    ? 'touchOnly'
    : 'mouseOnly';
```

#### Some `hybrid` device examples

- A touch capable Chromebook
- A touch capable Windows computer (both when it's used as a regular computer, and when in tablet mode, e.g. Microsoft Surface without a keyboard)
- A Samsung Galaxy Note with stylus
- All iPads now that they support a mouse and keyboard (note that Apple makes it impossible to know if a mouse or keyboard is attached, so iPads are always treated as a `hybrid` with `primaryInput` `touch`)

#### Detection limitations

These detections are limited by how the browser presents itself (the APIs it exposes and how it responds to media queries) so there is the potential for errors. As anyone who has done web development knows, browsers are quirky and they don't always behave in expected ways, so **Detect It uses real world browser behavior to triangulate the `deviceType` and `primaryInput`.** For more on this see the comments in the [source code](https://github.com/rafgraph/detect-it/blob/main/src/index.ts) for notes about detecting the device type. Also, [tests](https://github.com/rafgraph/detect-it/tree/main/src/__tests__) have been written to mock a number of different browser behaviors and edge cases. Cloning this repo and running `npm test` will provide insight into how `detect-it` will preform on different devices.
