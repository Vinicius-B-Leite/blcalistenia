import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import WorkoutProvider from './src/Contexts/WorkoutContext';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';
import 'react-native-gesture-handler';


const App = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <WorkoutProvider>
        <Routes />
      </WorkoutProvider>
    </ThemeProvider>
  )
}

export default App;