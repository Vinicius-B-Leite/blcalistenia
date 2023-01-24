import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import WorkoutProvider from './src/contexts/WorkoutContext';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';
import { ExerciseProvider } from './src/contexts/ExerciseContext';


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