Object.defineProperty(window, 'addEventListener', {
  value: jest.fn().mockImplementation((eventName, callback, useCapture) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const capture = Boolean(useCapture);
  }),
});
