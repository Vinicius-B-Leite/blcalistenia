import React, {useContext} from 'react';
import {ThemeContext} from '@/contexts/ThemeContext';
import Routes from '@/routes/routes';

import {Provider} from 'react-redux';

import {store} from '@/features/store';
import {ThemeProvider} from '@shopify/restyle';
import {dark} from './theme/dark';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components';
import {light} from './theme/light';
import {StatusBar} from 'react-native';

const Index: React.FC = () => {
  const {theme} = useContext(ThemeContext);

  const themes = {
    dark: dark,
    light: light,
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={themes[theme]}>
        <StatusBar
          backgroundColor={themes[theme].colors.thirdBg}
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Routes />
        <Toast config={toastConfig} visibilityTime={1500} />
      </ThemeProvider>
    </Provider>
  );
};

export default Index;
