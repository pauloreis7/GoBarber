import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles'


import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  // const [selectedDate, setSelectedDate] = useState(new Date())

  const { singOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img src="https://avatars.githubusercontent.com/u/63323224?v=4" alt="Paulo Reis" />

              <strong>Paulo Reis</strong>
              <span>
                <FiClock />
                8:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/63323224?v=4" alt="Paulo Reis" />

                <strong>Paulo Reis</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/63323224?v=4" alt="Paulo Reis" />

                <strong>Paulo Reis</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/63323224?v=4" alt="Paulo Reis" />

                <strong>Paulo Reis</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
}

export default Dashboard;
