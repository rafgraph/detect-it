// for typescript to allow deletion of matchMedia from window,
// otherwise get this error: The operand of a 'delete' operator must be optional.ts(2790)
// because window.matchMedia is not typed as an optional property
interface windowOptionalMatchMedia extends Omit<Window, 'matchMedia'> {
  matchMedia?: (query: string) => MediaQueryList;
}

const windowNoMatchMedia = (window as unknown) as windowOptionalMatchMedia;

delete windowNoMatchMedia.matchMedia;
