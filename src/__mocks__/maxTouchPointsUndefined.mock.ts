// for typescript to allow deletion of maxTouchPoints from window,
// otherwise get this error: The operand of a 'delete' operator must be optional.ts(2790)
interface navigatorOptionalMaxTouchPoints extends Omit<Navigator, 'maxTouchPoints'> {
  maxTouchPoints?: number;
}
interface windowOptionalMaxTouchPoints extends Omit<Window, 'navigator'> {
  navigator: navigatorOptionalMaxTouchPoints;
}

const windowNoMaxTouchPoints = (window as unknown) as windowOptionalMaxTouchPoints;

delete windowNoMaxTouchPoints.navigator.maxTouchPoints;
