import React from 'react';

import SingIn from './pages/SingIn'
// import SingUp from './pages/SingUp'
import GlobalStyle from './styles/globals'

import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
