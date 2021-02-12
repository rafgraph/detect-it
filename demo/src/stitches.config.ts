import { createStyled } from '@stitches/react';

export const { styled, css } = createStyled({
  prefix: '',
  tokens: {
    colors: {
      $pageBackground: 'rgb(240,240,240)',
      $codeBlockBackground: 'rgb(224,224,224)',
      $highContrast: 'rgb(0,0,0)',
      $lowContrast: 'rgb(128,128,128)',
      $red: 'rgb(224,0,0)',
      $green: 'rgb(0,168,0)',
      $blue: 'rgb(0,0,224)',
    },
  },
  breakpoints: {},
  utils: {},
});

export const darkThemeClass = css.theme({
  colors: {
    $pageBackground: 'rgb(32,32,32)',
    $codeBlockBackground: 'rgb(56,56,56)',
    $highContrast: 'rgb(192,192,192)',
    $lowContrast: 'rgb(136,136,136)',
    $red: 'rgb(216,0,0)',
    $green: 'rgb(0,168,0)',
    $blue: 'rgb(118,118,255)',
  },
});

export const globalStyles = css.global({
  'body, div, span, a, p, h1, h2, code': {
    margin: 0,
    border: 0,
    padding: 0,
    boxSizing: 'inherit',
    font: 'inherit',
    fontWeight: 'inherit',
    textDecoration: 'inherit',
    textAlign: 'inherit',
    color: 'inherit',
    background: 'transparent',
  },
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
    color: '$highContrast',
    fontFamily: 'system-ui, Helvetica Neue, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontSize: '16px',
    boxSizing: 'border-box',
    textSizeAdjust: 'none',
  },
  '#root': {
    minHeight: '100%',
    backgroundColor: '$pageBackground',
  },
});
