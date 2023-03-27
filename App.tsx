import React from 'react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';
import './src/services/calendarConfig'


const App = () => {

  return (
    <ThemeContextProvider>
      <Index />
    </ThemeContextProvider>
  )
}

export default App;