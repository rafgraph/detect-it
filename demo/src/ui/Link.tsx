import * as React from 'react';
import { Interactive } from 'react-interactive';
import { styled } from '../stitches.config';

const StyledLink = styled(Interactive.A, {
  color: '$lowContrast',
  textDecorationLine: 'underline',
  textDecorationStyle: 'solid',
  textDecorationColor: '$green',
  textDecorationThickness: 'from-font',
  padding: '2px 3px',
  margin: '-2px -3px',
  borderRadius: '3px',
  '&.hover, &.active': {
    color: '$highContrast',
    textDecorationColor: '$green',
    textDecorationStyle: 'solid',
  },
  '&.focusFromKey': {
    boxShadow: '0 0 0 2px $colors$purple ',
  },
});

interface LinkProps extends React.ComponentPropsWithoutRef<typeof StyledLink> {
  newWindow?: boolean;
}

export const Link: React.VFC<LinkProps> = ({ newWindow = true, ...props }) => (
  <StyledLink
    {...props}
    target={newWindow ? '_blank' : undefined}
    rel={newWindow ? 'noopener noreferrer' : undefined}
  />
);
