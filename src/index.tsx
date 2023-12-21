import React, {useContext} from 'react';
import {ThemeProvider as SCThemeProvider} from 'styled-components/native';
import {ThemeContext} from '@/contexts/ThemeContext';
import Routes from '@/routes';
import {darkMode} from '@/theme/darkMode';
import {lightMode} from '@/theme/lightMode';

import {Provider} from 'react-redux';

import {store} from '@/features/store';
import {ThemeProvider} from '@shopify/restyle';
import {dark} from './theme/dark';

const Index: React.FC = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <SCThemeProvider theme={theme == 'dark' ? darkMode : lightMode}>
      <Provider store={store}>
        <ThemeProvider theme={dark}>
          <Routes />
        </ThemeProvider>
      </Provider>
    </SCThemeProvider>
  );
};

export default Index;
