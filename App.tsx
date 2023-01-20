import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import WorkoutProvider from './src/Contexts/WorkoutContext';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';
import 'react-native-gesture-handler';
import { ExerciseProvider } from './src/Contexts/ExerciseContext';


const App = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <WorkoutProvider>
        <ExerciseProvider>
          <Routes />
        </ExerciseProvider>
      </WorkoutProvider>
    </ThemeProvider>
  )
}

export default App;