import React from 'react';
import { darkMode } from './src/theme/darkMode';
import { LocaleConfig } from 'react-native-calendars';
import { ThemeProvider } from 'styled-components/native';
import { ExerciseProvider } from './src/contexts/ExerciseContext';
import WorkoutSeasonProvider from './src/contexts/WorkooutSeason';
import HistoricProvider from './src/contexts/HistoricContext';
import AuthProvider from './src/contexts/AuthContext';
import Routes from './src/routes';
import WorkoutProvider from './src/contexts/WorkoutContext';
import { lightMode } from './src/theme/lightMode';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';



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
    <ThemeContextProvider>
      <Index/>
    </ThemeContextProvider>
  )
}

export default App;