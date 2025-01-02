import React from 'react'
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/user.context';
import 'remixicon/fonts/remixicon.css';

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App;
