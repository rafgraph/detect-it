export { supportsPassiveEvents } from 'detect-passive-events';

// so it doesn't throw if no window or matchMedia
const w = window || { screen: {}, navigator: {} };
const mm = w.matchMedia || (() => ({ matches: false }));

// rawTests, results used for main detects
export const rawTests = {
  touchEvents: {
    ontouchstartInWindow: 'ontouchstart' in w,
    TouchEventInWindow: 'TouchEvent' in w,
  },
  pointerEvents: {
    PointerEventInWindow: 'PointerEvent' in w,
    maxTouchPoints: w.navigator.maxTouchPoints || 0,
  },
  hover: {
    hover: mm('(hover: hover)').matches,
    none: mm('(hover: none)').matches,
    anyHover: mm('(any-hover: hover)').matches,
    anyNone: mm('(any-hover: none)').matches,
  },
  pointer: {
    fine: mm('(pointer: fine)').matches,
    coarse: mm('(pointer: coarse)').matches,
    anyFine: mm('(any-pointer: fine)').matches,
    anyCoarse: mm('(any-pointer: coarse)').matches,
  },
};

// ontouchstartInWindow is the old-old-legacy way to determine a touch device (think first few years of touch devices)
// and many websites interpreted it to mean that the device is a touch only phone
// so chromium on a windows computer with a touch screen (primary input mouse) have ontouchstartInWindow as false
// even though it supports TouchEvents, so need to check TouchEventInWindow as well for TouchEvent support,
export const supportsTouchEvents =
  rawTests.touchEvents.ontouchstartInWindow || rawTests.touchEvents.TouchEventInWindow;

export const supportsPointerEvents = rawTests.pointerEvents.PointerEventInWindow;

// if browser supports PointerEvents use is PointerEvents maxTouchPoints,
// otherwise use TouchEvents, but note that some browsers may support
// the TouchEvents api (TouchEventInWindow true) even when not running on a touch device,
// but ontouchstartInWindow will still be false, so only use ontouchstartInWindow
const hasTouch =
  rawTests.pointerEvents.maxTouchPoints > 0 || rawTests.touchEvents.ontouchstartInWindow;

const userAgent = w.navigator.userAgent || '';

// needed as a fallback when media query interaction features are not supported by the browser
// https://caniuse.com/css-media-interaction
const isAndriod = /android/.test(userAgent.toLowerCase());

// iPads now support a mouse that can hover, however the media query interaction
// feature results always say iPads only have a coarse pointer that can't hover
// even when a mouse is connected (anyFine and anyHover are always false), unfortunately
// the media query results don't indicate a hybrid device, which iPads should be classified as,
// so determine if it is an iPad so can indicate it should be treated as a hybrid device with anyHover true
const isIPad =
  rawTests.pointer.coarse &&
  // both iPad and iPhone can "request desktop site", which sets the userAgent to Macintosh
  // so need to check both userAgents to determine if it is an iOS device
  // and screen size to separate iPad from iPhone
  (/iPad/.test(userAgent) || /Macintosh/.test(userAgent)) &&
  Math.min(w.screen.width || 0, w.screen.height || 0) >= 768;

const hasCoarsePrimaryPointer =
  rawTests.pointer.coarse ||
  // if the pointer is not coarse and not fine then the browser doesn't support media query interaction features
  // so if isAndroid assume it has a coarse primary pointer, otherwise assume it doesn't
  // note that all iOS devices support media query interaction features
  (!rawTests.pointer.fine && isAndriod);

const hasAnyHoverOrAnyFinePointer =
  rawTests.pointer.anyFine ||
  rawTests.hover.anyHover ||
  // if no anyFine, no anyHover, and no anyCoarse then browser doesn't support media query interaction features
  // so if not isAndroid then assume has anyFine or anyHover, otherwise assume it doesn't
  (!rawTests.pointer.anyCoarse && !isAndriod) ||
  // iPad's might have an input device that can hover, so assume it has anyHover
  isIPad;

// a hybrid device is one that both hasTouch and any input can hover or has a fine pointer
// if it's not a hybrid, then if it hasTouch it's touchOnly, otherwise it's mouseOnly
export const deviceType: 'mouseOnly' | 'touchOnly' | 'hybrid' =
  hasTouch && hasAnyHoverOrAnyFinePointer ? 'hybrid' : hasTouch ? 'touchOnly' : 'mouseOnly';

export const primaryInput: 'mouse' | 'touch' =
  deviceType === 'mouseOnly'
    ? 'mouse'
    : deviceType === 'touchOnly'
    ? 'touch'
    : // if the device is a hybrid, then if the primary pointer is coarse
    // assume the primaryInput is touch, otherwise assume it's mouse
    hasCoarsePrimaryPointer
    ? 'touch'
    : 'mouse';
