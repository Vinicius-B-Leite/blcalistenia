import React, {useContext} from 'react';
import {ThemeContext} from '@/contexts/ThemeContext';
import Routes from '@/routes';

import {Provider} from 'react-redux';

import {store} from '@/features/store';
import {ThemeProvider} from '@shopify/restyle';
import {dark} from './theme/dark';

const Index: React.FC = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ThemeProvider theme={dark}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default Index;
