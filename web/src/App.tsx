import React from 'react';

import SingIn from './pages/SingIn'
// import SingUp from './pages/SingUp'
import GlobalStyle from './styles/globals'

import AuthContext from './context/AuthContext'

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{name: 'Paulo'}}>
      <SingIn />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
)

export default App;
