import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import WorkoutProvider from './src/contexts/WorkoutContext';
import Routes from './src/routes';
import { darkMode } from './src/theme/darkMode';
import { ExerciseProvider } from './src/contexts/ExerciseContext';
import WorkoutSeasonProvider from './src/contexts/WorkooutSeason';
import HistoricProvider from './src/contexts/HistoricContext';
import { LocaleConfig } from 'react-native-calendars';
import AuthProvider from './src/contexts/AuthContext';



const App = () => {
  LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'br';
  return (
    <ThemeProvider theme={darkMode}>
      <WorkoutProvider>
        <ExerciseProvider>
          <WorkoutSeasonProvider>
            <HistoricProvider>
              <AuthProvider>
                <Routes />
              </AuthProvider>
            </HistoricProvider>
          </WorkoutSeasonProvider>
        </ExerciseProvider>
      </WorkoutProvider>
    </ThemeProvider>
  )
}

export default App;