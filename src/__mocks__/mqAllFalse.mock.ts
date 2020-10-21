Object.defineProperty(window, 'matchMedia', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
  })),
});
