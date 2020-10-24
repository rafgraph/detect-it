Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => {
    switch (query) {
      case '(pointer: fine)':
        return { matches: true };
      case '(any-pointer: fine)':
        return { matches: true };

      case '(pointer: coarse)':
        return { matches: false };
      case '(any-pointer: coarse)':
        return { matches: true };

      case '(hover: hover)':
        return { matches: true };
      case '(any-hover: hover)':
        return { matches: true };

      case '(hover: none)':
        return { matches: false };
      case '(any-hover: none)':
        return { matches: false };

      default:
        return { matches: false };
    }
  }),
});
