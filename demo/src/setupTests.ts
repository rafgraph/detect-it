// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// stub matchMedia so tests run because it is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({ matches: true })),
});
