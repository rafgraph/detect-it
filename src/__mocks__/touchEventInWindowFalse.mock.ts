// for typescript to allow deletion of TouchEvent from window,
// otherwise get this error: The operand of a 'delete' operator must be optional.ts(2790)
// because window.TouchEvent is not typed as an optional property
interface windowOptionalTouchEvent extends Omit<Window, 'TouchEvent'> {
  TouchEvent?: TouchEvent;
}
const windowNoTouchEvent = (window as unknown) as windowOptionalTouchEvent;

delete windowNoTouchEvent.TouchEvent;
