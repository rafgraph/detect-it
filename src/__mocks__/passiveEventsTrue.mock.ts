Object.defineProperty(window, 'addEventListener', {
  value: jest.fn().mockImplementation((eventName, callback, options) => {
    // eslint-disable-next-line
    const passiveOption = options.passive;
  }),
});
