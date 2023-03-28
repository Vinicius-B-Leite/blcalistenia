import React from 'react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';
import './src/services/calendarConfig'
import RealmProvider from './src/contexts/RealmContext';


const App = () => {

  return (
    <RealmProvider>
      <ThemeContextProvider>
        <Index />
      </ThemeContextProvider>
    </RealmProvider>

  )
}

export default App;