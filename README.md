# Detect It

[![npm](https://img.shields.io/npm/dm/detect-it?label=npm)](https://www.npmjs.com/package/detect-it) [![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/detect-it?color=purple)](https://bundlephobia.com/result?p=detect-it) ![npm type definitions](https://img.shields.io/npm/types/detect-it?color=blue)

- **[Live detection demo](https://detect-it.rafgraph.dev)**
- Detect if a device is `mouseOnly`, `touchOnly`, or `hybrid`
- Detect if the primary input is `mouse` or `touch`
- Detect if the browser supports Pointer Events, Touch Events, and passive event listeners
- You may also be interested in [Event From](https://github.com/rafgraph/event-from), which determines if a browser event was caused by `mouse`, `touch`, or `key` input


Detect It's state is determined using multiple media query and API detections. Detect It uses the `hover` and `pointer` media queries, the Pointer Events API and max touch points detections, and two Touch Events API detections (browsers respond differently to each Touch Events API detection depending on the device 😩 welcome to WebDev). But now you don't have to worry about any of this, just let Detect It handle the details while you optimize your app for the type of device that's being used. 😁

Detect It has been tested on numerous real world devices (since 2016), and the tests mock multiple devices and edge cases to ensure accurate results. The detection relies on how the browser presents the capabilities of the device as it is not possible to access the device hardware directly.

---

[CDN option](#pre-built-cdn-option) ⚡️ [Recommended usage](#recommended-usage) ⚡️ [Device responsive UX](#device-responsive-ux) ⚡️ [Setting event listeners](#setting-event-listeners) ⚡️ [Detection details](#detection-details)

---

```
npm install --save detect-it
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

Indicates if the the device is `mouseOnly`, `touchOnly` or `hybrid`. For info on how the detection works and how specific devices are classified see the [Detection details](#detection-details) section.

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
  document.addEventListener('scroll', handleScroll, {
    capture: false,
    passive: true,
  });
} else {
  // passive events are not supported by the browser
  document.addEventListener('scroll', handleScroll, false);
}
```

---

## Pre-built CDN option

Optionally, instead of using `npm install` you can load Detect It directly in the browser. A minified and production ready UMD version is available from the Unpkg CDN for this purpose.

```html
<!-- in index.html -->
<script src="https://unpkg.com/detect-it@4/dist/detect-it.umd.production.js"></script>
```

```js
// it will be available on the window as DetectIt
if (window.DetectIt.primaryInput === 'touch') {
  // tailor UX for touch input
}
```

---

## Recommended usage

TL;DR:

- Use `primaryInput` to optimize the user experience for either `mouse` or `touch` input (note that the app should still be usable by both inputs). Use this along with classic responsive design that adapts to screen/window size to create a fully device responsive app.
- Listening for user interactions:
  - If the browser `supportsPointerEvents` then only set Pointer Event listeners and use [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType) to determine if the interaction was from `mouse` or `touch`.
  - Otherwise always set both Mouse Event and Touch Event listeners and use [Event From](https://github.com/rafgraph/event-from) to ignore Mouse Events generated from touch input.

### Device responsive UX

Device responsive UX is about creating web apps that feel native on every device. This goes beyond classic responsive design, which only responds to the screen/window size, and includes how the user can interact with the app (the capabilities of the device). Can the user hover, swipe, long press, etc?

There are 3 parts of device responsive UX: **Size** (size of screen/window), **Capabilities** (what the user can do/capabilities of the device), and **Interaction** (is the user hovering, touching, etc). **Size** and **Capabilities** need to be known at render time (when the UI is rendered before the user interacts with it), and **Interaction** needs to be known at interaction time (when the user is interacting with the app).

- **Size**
  - This can be determined using media queries, for example `(max-width: 600px)`, either applied via CSS or in JavaScript by using something like [React Media](https://github.com/ReactTraining/react-media).
- **Capabilities**
  - This is what **Detect It** is for - knowing at render time what the capabilities of the device are. There are a number of ways that you can use `deviceType` or `primaryInput` to optimize the UX for the capabilities of the device, however, in most cases I've found it makes sense to just use `primaryInput` and optimize the UX for `mouse` or `touch`, while ensuring that the app is still usable by both inputs.
- Putting **Size** and **Capabilities** together, one approach is to optimize the UX for 4 scenarios:
  - Wide screen with `primaryInput` `mouse`: desktop/laptop with a normal window
  - Narrow screen and `primaryInput` `mouse`: desktop/laptop with a narrow window
  - Wide screen with `primaryInput` `touch`: tablet
  - Narrow screen with `primaryInput` `touch`: phone
- **Interaction**
  - Is the user hovering, touching, etc. To help with this I created [React Interactive](https://github.com/rafgraph/react-interactive) which provides a callback for interactive state changes (`hover`, `mouseActive`, `touchActive`, `keyActive`) and allows you to style touch interactions in a way that feels native and is not possible with CSS pseudo classes.

### Setting event listeners

Setting event listeners can be thought of as either setting Pointer Event listeners **_or_** setting Mouse Event and Touch Event listeners. Pointer Events can do everything that Mouse Events and Touch Events can do (and more), without having to worry about if a Mouse Event was caused by touch input and so should be ignored. It is generally preferred to use Pointer Events if they are supported.

#### Pointer Event listeners

If the browser `supportsPointerEvents` then only set Pointer Event listeners and use [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType) to determine if the interaction was from `mouse` or `touch`.

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

#### Mouse Event and Touch Event listeners

If the browser doesn't support Pointer Events, then there are a couple of ways to approach setting mouse and touch event listeners.

> Note that a touch interaction will fire Touch Events as the interaction is in progress (touch on the screen), and will fire Mouse Events during a long press (extended touch on the screen), or after the touch interaction has finished (after the touch is removed from the screen) to support sites that only listen for Mouse Events.

**Option 1**: If the device is `mouseOnly` or `touchOnly` then only set mouse or touch listeners, and if the device is `hybrid` set both mouse and touch event listeners and ignore Mouse Events caused by touch input (you can use [Event From](https://github.com/rafgraph/event-from) for this).

**Option 2**: Always set both mouse and touch event listeners and use [Event From](https://github.com/rafgraph/event-from) to ignore Mouse Events from touch input.

I prefer option 2 as it's simpler to code and I haven't noticed any performance impact from setting extra listeners (note that setting Touch Event listeners on a browser that doesn't support Touch Events is fine, the browser will just ignore the event listeners).

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
  // Pointer Events are not supported so set both Mouse Event and Touch Event listeners
  element.addEventListener('mouseenter', handleMouseEnter, false);
  element.addEventListener('touchstart', handleTouchStart, false);
}
```

---

## Detection details

#### Determining the `deviceType` and `primaryInput`

To determine the `deviceType` and `primaryInput` Detect It uses several media query and API detections to triangulate what type of device is being used. The entire detection is done when the script is imported so the results are known at render time (Detect It doesn't set any event listeners).

Detect It uses the `hover` and `pointer` media queries, the Pointer Events API and max touch points detections, and two Touch Events API detections (browsers respond differently to each Touch Events API detection depending on the device). For more on this see the comments in the [source code](https://github.com/rafgraph/detect-it/blob/main/src/index.ts) for notes about detecting the device type and edge cases.

#### Device tests and limitations

Detect It has been tested on numerous real world devices (since 2016), and the [tests](https://github.com/rafgraph/detect-it/tree/main/src/__tests__) mock multiple devices and edge cases to ensure accurate results. However, these detections are limited by how the browser presents the capabilities of the device (the APIs it exposes and how it responds to media queries) so there are some limitations. For example, on an iPad it is impossible to tell if a mouse is connected, so Detect It always treats iPads as a `hybrid` device with `primaryInput` `touch`.

In the case of a legacy browser or device that doesn't support the detections (e.g. no media query or Pointer Events support), Detect It will fall back to a default `mouseOnly` or `touchOnly` state.

#### Hybrid device definition

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
