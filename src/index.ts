interface noWindow {
  screen: {
    width?: number;
    height?: number;
  };
  navigator: {
    maxTouchPoints?: number;
    userAgent?: string;
  };
  addEventListener?: () => void;
  removeEventListener?: () => void;
  matchMedia?: () => { matches: boolean };
}

// so it doesn't throw if no window or matchMedia
const w: Window | noWindow =
  typeof window !== 'undefined' ? window : { screen: {}, navigator: {} };
const matchMedia = (w.matchMedia || (() => ({ matches: false }))).bind(w);

// passive events test
// adapted from https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
let passiveOptionAccessed = false;
const options = {
  get passive() {
    return (passiveOptionAccessed = true);
  },
};
// have to set and remove a no-op listener instead of null
// (which was used previously), because Edge v15 throws an error
// when providing a null callback.
// https://github.com/rafgraph/detect-passive-events/pull/3
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
w.addEventListener && w.addEventListener('p', noop, options);
w.removeEventListener && w.removeEventListener('p', noop, false);

export const supportsPassiveEvents: boolean = passiveOptionAccessed;

export const supportsPointerEvents: boolean = 'PointerEvent' in w;

const onTouchStartInWindow = 'ontouchstart' in w;
const touchEventInWindow = 'TouchEvent' in w;
// onTouchStartInWindow is the old-old-legacy way to determine a touch device
// and many websites interpreted it to mean that the device is a touch only phone,
// so today browsers on a desktop/laptop computer with a touch screen (primary input mouse)
// have onTouchStartInWindow as false (to prevent from being confused with a
// touchOnly phone) even though they support the TouchEvents API, so need to check
// both onTouchStartInWindow and touchEventInWindow for TouchEvent support,
// however, some browsers (chromium) support the TouchEvents API even when running on
// a mouse only device (touchEventInWindow true, but onTouchStartInWindow false)
// so the touchEventInWindow check needs to include an coarse pointer media query
export const supportsTouchEvents: boolean =
  onTouchStartInWindow ||
  (touchEventInWindow && matchMedia('(any-pointer: coarse)').matches);

const hasTouch = (w.navigator.maxTouchPoints || 0) > 0 || supportsTouchEvents;

// userAgent is used as a backup to correct for known device/browser bugs
// and when the browser doesn't support interaction media queries (pointer and hover)
// see https://caniuse.com/css-media-interaction
const userAgent = w.navigator.userAgent || '';

// iPads now support a mouse that can hover, however the media query interaction
// feature results always say iPads only have a coarse pointer that can't hover
// even when a mouse is connected (anyFine and anyHover are always false),
// this unfortunately indicates a touch only device but iPads should
// be classified as a hybrid device, so determine if it is an iPad
// to indicate it should be treated as a hybrid device with anyHover true
const isIPad =
  matchMedia('(pointer: coarse)').matches &&
  // both iPad and iPhone can "request desktop site", which sets the userAgent to Macintosh
  // so need to check both userAgents to determine if it is an iOS device
  // and screen size to separate iPad from iPhone
  /iPad|Macintosh/.test(userAgent) &&
  Math.min(w.screen.width || 0, w.screen.height || 0) >= 768;

const hasCoarsePrimaryPointer =
  (matchMedia('(pointer: coarse)').matches ||
    // if the pointer is not coarse and not fine then the browser doesn't support
    // interaction media queries (see https://caniuse.com/css-media-interaction)
    // so if it has onTouchStartInWindow assume it has a coarse primary pointer
    (!matchMedia('(pointer: fine)').matches && onTouchStartInWindow)) &&
  // bug in firefox (as of v81) on hybrid windows devices where the interaction media queries
  // always indicate a touch only device (only has a coarse pointer that can't hover)
  // so assume that the primary pointer is not coarse for firefox windows
  !/Windows.*Firefox/.test(userAgent);

const hasAnyHoverOrAnyFinePointer =
  matchMedia('(any-pointer: fine)').matches ||
  matchMedia('(any-hover: hover)').matches ||
  // iPads might have an input device that can hover, so assume it has anyHover
  isIPad ||
  // if no onTouchStartInWindow then the browser is indicating that it is not a touch only device
  // see above note for supportsTouchEvents
  !onTouchStartInWindow;

// a hybrid device is one that both hasTouch and
// any input can hover or has a fine pointer, or the primary pointer is not coarse
// if it's not a hybrid, then if it hasTouch it's touchOnly, otherwise it's mouseOnly
export const deviceType: 'mouseOnly' | 'touchOnly' | 'hybrid' =
  hasTouch && (hasAnyHoverOrAnyFinePointer || !hasCoarsePrimaryPointer)
    ? 'hybrid'
    : hasTouch
    ? 'touchOnly'
    : 'mouseOnly';

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
