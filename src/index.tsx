import React, {useContext} from 'react';
import {ThemeContext} from '@/contexts/ThemeContext';
import Routes from '@/routes';

import {Provider} from 'react-redux';

import {store} from '@/features/store';
import {ThemeProvider} from '@shopify/restyle';
import {dark} from './theme/dark';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components';

const Index: React.FC = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ThemeProvider theme={dark}>
        <Routes />
        <Toast config={toastConfig} visibilityTime={1500} />
      </ThemeProvider>
    </Provider>
  );
};

export default Index;
