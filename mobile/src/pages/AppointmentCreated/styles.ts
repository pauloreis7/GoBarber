import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 32px;
  color: #f4ede8;
  text-align: center;
  
  margin-top: 48px;
`;

export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;

  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  background: #ff9000;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  margin-top: 24px;
`;

export const OkButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;