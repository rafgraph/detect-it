// for typescript to allow deletion of PointerEvent from window,
// otherwise get this error: The operand of a 'delete' operator must be optional.ts(2790)
// because window.PointerEvent is not typed as an optional property
interface windowOptionalPointerEvent extends Omit<Window, 'PointerEvent'> {
  PointerEvent?: PointerEvent;
}
const windowNoPointerEvent = (window as unknown) as windowOptionalPointerEvent;

delete windowNoPointerEvent.PointerEvent;
