import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from './index'

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;

  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  line-height: 28px;
  
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  margin-left: auto;
  
  border-radius: 28px;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;

  background: ${(props) => props.selected ? '#ff9000' : '#3e3b47'};
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;

  border-radius: 36px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${(props) => props.selected ? '#232129' : '#f4ede8'};

  margin-left: 8px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;

  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  background: #ff9000;
  border-radius: 10px;
  
  height: 46px;
  margin: 0 24px;
  justify-content: center;
  align-items: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: #232129;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;