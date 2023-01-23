import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import WorkoutProvider from './src/contexts/WorkoutContext';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';
import { ExerciseProvider } from './src/contexts/ExerciseContext';
import ExerciseInWorkoutProvider from './src/contexts/ExercisesInWorkout';


const App = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <WorkoutProvider>
        <ExerciseProvider>
          <ExerciseInWorkoutProvider>
            <Routes />
          </ExerciseInWorkoutProvider>
        </ExerciseProvider>
      </WorkoutProvider>
    </ThemeProvider>
  )
}

export default App;