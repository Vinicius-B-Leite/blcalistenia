import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import AuthProvider from './contexts/AuthContext';
import { ExerciseProvider } from './contexts/ExerciseContext';
import HistoricProvider from './contexts/HistoricContext';
import SuggestWorkoutProvider from './contexts/SuggestWorkoutContex';
import { ThemeContext } from './contexts/ThemeContext';
import WorkoutSeasonProvider from './contexts/WorkooutSeason';
import WorkoutProvider from './contexts/WorkoutContext';
import Routes from './routes';
import { darkMode } from './theme/darkMode';
import { lightMode } from './theme/lightMode';

// import { Container } from './styles';

const Index: React.FC = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <ThemeProvider theme={theme == 'dark' ? darkMode : lightMode}>
            <WorkoutProvider>
                <ExerciseProvider>
                    <WorkoutSeasonProvider>
                        <HistoricProvider>
                            <AuthProvider>
                                <SuggestWorkoutProvider>
                                    <Routes />
                                </SuggestWorkoutProvider>
                            </AuthProvider>
                        </HistoricProvider>
                    </WorkoutSeasonProvider>
                </ExerciseProvider>
            </WorkoutProvider>
        </ThemeProvider>
    )
}

export default Index;