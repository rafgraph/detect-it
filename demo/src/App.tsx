import {
  deviceType,
  primaryInput,
  supportsPointerEvents,
  supportsTouchEvents,
  supportsPassiveEvents,
} from 'detect-it';
import { styled, globalCss } from './stitches.config';
import { DarkModeButton } from './ui/DarkModeButton';
import { Link } from './ui/Link';

const AppContainer = styled('div', {
  maxWidth: '400px',
  padding: '14px 15px 25px',
  margin: '0 auto',
});

const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '6px',
});

const H1 = styled('h1', {
  fontSize: '26px',
  marginRight: '16px',
});

const LinkContainer = styled('div', {
  marginBottom: '20px',
});

const H2 = styled('h2', {
  margin: '36px 0 -6px',
  fontSize: '22px',
});

const CodeBlock = styled('div', {
  backgroundColor: '$codeBlockBackground',
  padding: '4px 16px 6px',
  borderRadius: '6px',
  margin: '16px 0',
});

const Code = styled('code', {
  display: 'block',
  margin: '5px 0',
});

const Result = styled('span', {
  color: '$blue',
  variants: {
    bool: {
      true: {
        color: '$green',
      },
      false: {
        color: '$red',
      },
    },
  },
});

interface BooleanResultProps {
  bool: boolean;
}
const BooleanResult: React.FC<BooleanResultProps> = ({ bool }) => (
  <Result bool={bool}>{`${bool}`}</Result>
);

export const App = () => {
  globalCss();

  return (
    <AppContainer>
      <HeaderContainer>
        <H1>Detect It &#8211; Live Detection</H1>
        <DarkModeButton />
      </HeaderContainer>
      <LinkContainer>
        <Link
          title="GitHub Repository for Detect It"
          href="https://github.com/rafgraph/detect-it"
        >
          https://github.com/rafgraph/detect-it
        </Link>
      </LinkContainer>
      <CodeBlock>
        <Code>
          deviceType: <Result>{deviceType}</Result>
        </Code>
        <Code>
          primaryInput: <Result>{primaryInput}</Result>
        </Code>
        <Code>
          supportsPointerEvents: <BooleanResult bool={supportsPointerEvents} />
        </Code>
        <Code>
          supportsTouchEvents: <BooleanResult bool={supportsTouchEvents} />
        </Code>
        <Code>
          supportsPassiveEvents: <BooleanResult bool={supportsPassiveEvents} />
        </Code>
      </CodeBlock>

      <H2>Additional Device Info</H2>

      <CodeBlock>
        <Code>
          primaryPointerFine:{' '}
          <BooleanResult bool={window.matchMedia('(pointer: fine)').matches} />
        </Code>
        <Code>
          anyPointerFine:{' '}
          <BooleanResult
            bool={window.matchMedia('(any-pointer: fine)').matches}
          />
        </Code>
        <Code>
          primaryPointerCoarse:{' '}
          <BooleanResult
            bool={window.matchMedia('(pointer: coarse)').matches}
          />
        </Code>
        <Code>
          anyPointerCoarse:{' '}
          <BooleanResult
            bool={window.matchMedia('(any-pointer: coarse)').matches}
          />
        </Code>
        {/* <Code>
          primaryPointerNone:{' '}
          <BooleanResult bool={window.matchMedia('(pointer: none)').matches} />
        </Code>
        <Code>
          anyPointerNone:{' '}
          <BooleanResult
            bool={window.matchMedia('(any-pointer: none)').matches}
          />
        </Code> */}
      </CodeBlock>
      <CodeBlock>
        <Code>
          primaryHover:{' '}
          <BooleanResult bool={window.matchMedia('(hover: hover)').matches} />
        </Code>
        <Code>
          anyHover:{' '}
          <BooleanResult
            bool={window.matchMedia('(any-hover: hover)').matches}
          />
        </Code>
        <Code>
          primaryHoverNone:{' '}
          <BooleanResult bool={window.matchMedia('(hover: none)').matches} />
        </Code>
        <Code>
          anyHoverNone:{' '}
          <BooleanResult
            bool={window.matchMedia('(any-hover: none)').matches}
          />
        </Code>
      </CodeBlock>
      <CodeBlock>
        <Code>
          pointerEventInWindow:{' '}
          <BooleanResult bool={'PointerEvent' in window} />
        </Code>
        <Code>
          maxTouchPoints:{' '}
          <Result>{`${window.navigator.maxTouchPoints}`}</Result>
        </Code>
      </CodeBlock>
      <CodeBlock>
        <Code>
          onTouchStartInWindow:{' '}
          <BooleanResult bool={'ontouchstart' in window} />
        </Code>
        <Code>
          touchEventInWindow: <BooleanResult bool={'TouchEvent' in window} />
        </Code>
      </CodeBlock>
      <CodeBlock>
        <Code>
          screenSize:{' '}
          <Result>{`${window.screen.width}x${window.screen.height}`}</Result>
        </Code>
      </CodeBlock>
      <CodeBlock>
        <Code>
          userAgent: <Result>{window.navigator.userAgent}</Result>
        </Code>
      </CodeBlock>
    </AppContainer>
  );
};
