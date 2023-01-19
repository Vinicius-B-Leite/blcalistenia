import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';


const App = () => {
  return (
      <ThemeProvider theme={darkMode}>
        <Routes/>
      </ThemeProvider>    
  )
}

export default App;