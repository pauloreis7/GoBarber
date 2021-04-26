import styled, { css, keyframes } from 'styled-components'
import { animated } from 'react-spring'

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ff9000;
    color: #e5e5e5;
  `,

  success: css`
    background: #4BB543;
    color: #e5e5e5;
  `,

  error: css`
    background: #e53935;
    color: #e5e5e5;
  `,
}

const AnimatedToastTime = keyframes`
  from { width: 0px; }
  to { width: 100%; }
`;

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 6px 6px 0 0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;

    height: 4px;

    background-color: #e5e5e5;
    opacity: 0.9;

    animation: ${AnimatedToastTime} 3500ms ease-out forwards;
  }

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.9;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props => !props.hasDescription && css`
    align-items: center;

    svg {
      margin-top: 0;
    }
  `}
`;
