import React from 'react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';
import './src/services/calendarConfig'
import { AppProvider } from '@realm/react';





const App = () => {

  return (
    <ThemeContextProvider>
      <AppProvider id='application-0-fcyzd'>
        <Index/>
      </AppProvider>
    </ThemeContextProvider>
  )
}


export default App;