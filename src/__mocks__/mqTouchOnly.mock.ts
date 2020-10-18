Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => {
    switch (query) {
      case '(pointer: fine)':
        return { matches: false };
      case '(any-pointer: fine)':
        return { matches: false };

      case '(pointer: coarse)':
        return { matches: true };
      case '(any-pointer: coarse)':
        return { matches: true };

      case '(hover: hover)':
        return { matches: false };
      case '(any-hover: hover)':
        return { matches: false };

      case '(hover: none)':
        return { matches: true };
      case '(any-hover: none)':
        return { matches: true };

      default:
        return { matches: false };
    }
  }),
});
