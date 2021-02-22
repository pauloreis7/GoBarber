import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  border: 0;
  color: #312e38;
  font-weight: 500;

  height: 56px;
  width: 100%;
  padding: 0 16px;
  margin-top: 16px;
  transition: background-color 200ms;

  &:hover {
    background: ${shade(0.13, '#ff9000')};
  }
`;
