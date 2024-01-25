import React, {useEffect} from 'react';
import ThemeContextProvider from '@/contexts/ThemeContext';
import Index from '@/index';
import '@/services/calendarConfig';

import SplashScreen from 'react-native-splash-screen';
import UserContextProvider from '@/contexts/AuthContext';

import Toast from 'react-native-toast-message';
import {toastConfig} from '@/components';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Index />
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
