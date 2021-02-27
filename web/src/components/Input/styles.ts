import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip/index'

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  color: #666360;
  border: 2px solid #232129;
  padding-left: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    padding: 16px 16px 16px 0;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `
  }

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `
  }

  svg {
    margin-right: 16px;

    ${props =>
      props.isFilled &&
      css`
        color: #ff9000;
      `
    }
  }

`;

export const Error = styled(Tooltip)`
  height: 20px;

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
