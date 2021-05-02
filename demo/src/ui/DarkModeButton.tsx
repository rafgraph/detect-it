import * as React from 'react';
import { Interactive } from 'react-interactive';
import { SunIcon } from '@radix-ui/react-icons';
import useDarkMode from 'use-dark-mode';
import { styled, darkThemeClass } from '../stitches.config';

const Button = styled(Interactive.Button, {
  color: '$highContrast',
  '&.hover, &.active': {
    color: '$green',
    borderColor: '$green',
  },
  '&.focusFromKey': {
    boxShadow: '0 0 0 2px $colors$purple',
  },
});

export const DarkModeButton: React.VFC = (props) => {
  // put a try catch around localStorage so this app will work in codesandbox
  // when the user blocks third party cookies in chrome,
  // which results in a security error when useDarkMode tries to access localStorage
  // see https://github.com/codesandbox/codesandbox-client/issues/5397
  let storageProvider: any = null;
  try {
    storageProvider = localStorage;
  } catch {}
  const darkMode = useDarkMode(undefined, {
    classNameDark: darkThemeClass,
    storageProvider,
  });

  // add color-scheme style to <html> element
  // so document scroll bars will have native dark mode styling
  React.useEffect(() => {
    if (darkMode.value === true) {
      // @ts-ignore because colorScheme type not added yet
      document.documentElement.style.colorScheme = 'dark';
    } else {
      // @ts-ignore
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode.value]);

  return (
    <Button
      {...props}
      onClick={darkMode.toggle}
      css={{
        width: '36px',
        height: '36px',
        padding: '3px',
        margin: '-3px',
        borderRadius: '50%',
      }}
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
    >
      <SunIcon width="30" height="30" />
    </Button>
  );
};
