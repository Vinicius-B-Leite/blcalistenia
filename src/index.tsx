import React, {useContext} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {ThemeContext} from '@/contexts/ThemeContext';
import Routes from '@/routes';
import {darkMode} from '@/theme/darkMode';
import {lightMode} from '@/theme/lightMode';

import {RealmProvider} from '@/services/realm/realm';
import {Provider} from 'react-redux';

import {store} from '@/features/store';

const Index: React.FC = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme == 'dark' ? darkMode : lightMode}>
      <RealmProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </RealmProvider>
    </ThemeProvider>
  );
};

export default Index;
