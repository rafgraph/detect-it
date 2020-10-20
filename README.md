# Detect It

Detect if a device is `mouseOnly`, `touchOnly`, or `hybrid`, and if the primary input is `mouse` or `touch`. Also detects if the browser supports the Pointer Events API, the Touch Events API, and passive event listeners. Detect It is tree-shakable and side-effect free.

This is useful for creating device responsive UX and responding to user interactions. When creating apps with device responsive UX it is important to know what the user can do. Can they hover? Can they swipe? Etc. Once it's known what the user can do, the next question is how does the app listen for user input. For example, it's not enough to know that the user is on a touch device, the app also needs to know how to listen for touch input, should the app set Pointer Event listeners or Touch Event listeners? For more on this see the [Recommended usage](#recommended-usage) section.

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

Indicates if the the device is `mouseOnly`, `touchOnly` or `hybrid`. For info on how the detection works and how specific devices are classified see [Notes on detecting the `deviceType`](#notes-on-detecting-the-devicetype).

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

Indicates if the browser supports the Pointer Events API. See [MDN's Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) and the [W3C Pointer Events specification](https://www.w3.org/TR/pointerevents/) for more information on Pointer Events.

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

Indicates if the browser supports passive event listeners. See this [Passive Events Explainer](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) for more information on passive events.

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

- Use `primaryInput` for creating device responsive UX that optimizes the user experience for either `mouse` or `touch` input (note that the app should still be usable by both inputs, but only optimized for one). Use this along with classic responsive design that adapts to screen/window size to create a fully device responsive app.
- Listening for user interactions:
  - If the browser `supportsPointerEvents` then only set PointerEvent listeners and use [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType) to determine if the interaction was from `mouse` or `touch`.
  - Otherwise set both MouseEvent and TouchEvent listeners and use [`event-from`](https://github.com/rafgraph/event-from) to ignore MouseEvents generated from touch input.

### Device responsive UX

TODO

### Setting event listeners

TODO

---

## Notes on detecting the `deviceType`

TODO

See comments in the [source code](https://github.com/rafgraph/detect-it/blob/main/src/index.ts) for notes about detecting the device type. Also, [tests](https://github.com/rafgraph/detect-it/tree/main/src/__tests__) have been written to mock a number of different device types and edge cases. Cloning this repo and running `npm test` will provide insight into how `detect-it` will preform on different devices.
