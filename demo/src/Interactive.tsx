import Interactive from 'react-interactive';
import { SunIcon } from '@modulz/radix-icons';
import { styled } from './stitches.config';

interface DarkModeToggleProps {
  onClick: () => void;
  className?: any;
}
const DarkModeToggle: React.VFC<DarkModeToggleProps> = ({
  onClick,
  className,
  ...props
}) => {
  return (
    <Interactive
      {...props}
      className={className.toString()}
      onClick={onClick}
      as="span"
      hover={{ className: 'hover' }}
      active="hover"
      focusFromTab={{
        className: 'focusFromTab',
        style: {
          outline: null,
          outlineOffset: null,
        },
      }}
      touchActiveTapOnly
    >
      <SunIcon width="30" height="30" />
    </Interactive>
  );
};

export const StyledDarkModeToggle = styled(DarkModeToggle, {
  color: '$highContrast',
  width: '30px',
  height: '30px',
  display: 'inline-block',

  '&.hover': {
    color: '$green',
  },

  '&.focusFromTab': {
    // have separate outlineColor b/c tokens don't work in outline shorthand
    // https://github.com/modulz/stitches/issues/103
    outlineColor: '$green',
    outline: '2px solid',
    outlineOffset: '2px',
  },
});

interface InteractiveLinkProps {
  children: React.ReactNode;
  href: string;
  className?: any;
}
const InteractiveLink: React.VFC<InteractiveLinkProps> = (props) => {
  return (
    <Interactive
      {...props}
      className={props.className.toString()}
      as="a"
      hover={{ className: 'hover' }}
      active="hover"
      focusFromTab={{
        className: 'focusFromTab',
        style: {
          outline: null,
          outlineOffset: null,
        },
      }}
      touchActiveTapOnly
      target="_blank"
      rel="noopener noreferrer"
    />
  );
};

export const StyledInteractiveLink = styled(InteractiveLink, {
  color: '$lowContrast',
  borderBottom: '1px dotted $green',
  textDecoration: 'none',

  '&.hover': {
    color: '$highContrast',
    borderBottomStyle: 'solid',
  },

  '&.focusFromTab': {
    // have separate outlineColor b/c tokens don't work in outline shorthand
    // https://github.com/modulz/stitches/issues/103
    outlineColor: '$green',
    outline: '2px solid',
    outlineOffset: '2px',
  },
});
