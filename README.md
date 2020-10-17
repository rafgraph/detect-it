# Detect It

Detects if the `deviceType` is `mouseOnly`, `touchOnly`, or `hybrid`, if the `primaryInput` is `mouse` or `touch`, and if the browser supports the Pointer Events API, the Touch Events API, and passive event listeners. Detect It is tree-shakable and side-effect free.

[Live detection test](https://detect-it.rafgraph.dev) (code in the [demo repo](https://github.com/rafgraph/detect-it-demo))

[![npm](https://img.shields.io/npm/dm/detect-it?label=npm)](https://www.npmjs.com/package/detect-it) [![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/detect-it/3?color=purple)](https://bundlephobia.com/result?p=detect-it) ![npm type definitions](https://img.shields.io/npm/types/detect-it?color=blue)

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

### `deviceType`
If the the device is `mouseOnly`, `touchOnly` or `hybrid`. TODO etc see below section for notes on device type etc.

### `primaryInput`
If the primary input for the device is `mouse` or `touch`. TODO etc

### `supportsPointerEvents`
If the browser supports the Pointer Events API. TODO etc

### `supportsTouchEvents`
If the browser supports the Touch Events API. TODO etc

### `supportsPassiveEvents`
If the browser supports passive event listeners. TODO etc 

## Recommended Usage
TODO



## Notes about detecting the `deviceType`
TODO see old readme