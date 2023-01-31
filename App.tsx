import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import WorkoutProvider from './src/contexts/WorkoutContext';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';
import { ExerciseProvider } from './src/contexts/ExerciseContext';
import WorkoutSeasonProvider from './src/contexts/WorkooutSeason';


const App = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <WorkoutProvider>
        <ExerciseProvider>
          <WorkoutSeasonProvider>
            <Routes />
          </WorkoutSeasonProvider>
        </ExerciseProvider>
      </WorkoutProvider>
    </ThemeProvider>
  )
}

export default App;