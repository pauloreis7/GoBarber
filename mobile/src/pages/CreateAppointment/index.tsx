import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns'
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  Header, 
  BackButton, 
  HeaderTitle, 
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles'

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation()  

  const routeParams = route.params as RouteParams;

  const [ availability, setAvailability ] = useState<AvailabilityItem[]>([])
  const [ showDatePicker, setShowDatePicker ] = useState(false)
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ providers, setProviders ] = useState<Provider[]>([])
  const [ selectedProvider, setSelectedProvider ] = useState(routeParams.providerId)

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() - 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state)
  }, [])

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if(Platform.OS === 'android') {
      setShowDatePicker(false)
    }

    if(date) {
      setSelectedDate(date)
    }
  }, [])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour, 
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour, 
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiro</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />

      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer 
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider} 
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && <DateTimePicker
          {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })}
          mode="date"
          onChange={handleDateChanged}
          display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
          value={selectedDate}
        />}

      </Calendar>
    </Container>
  )
}

export default CreateAppointment;