// Type definitions for detectIt
// Project: https://github.com/rafrex/detect-it
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

import detectHover from 'detect-hover';
import detectPassiveEvents from 'detect-passive-events';
import detectPointer from 'detect-pointer';
import detectTouchEvents from 'detect-touch-events';

declare namespace detectIt
{
  const deviceType: string = 'mouseOnly' | 'touchOnly' | 'hybrid';
  const hasMouse: boolean;
  const hasTouch: boolean;
  const maxTouchPoints: number;
  const passiveEvents: boolean;
  const primaryHover: string = 'hover' | 'none';
  const primaryPointer: string = 'coarse' | 'fine' | 'none';

  const state = {
    detectHover: detectHover,
    detectPassiveEvents: detectPassiveEvents,
    detectPointer: detectPointer,
    detectTouchEvents: detectTouchEvents,
  }

  const update: () => void;
}

export default detectIt;
