import React, {useEffect} from 'react';
import ThemeContextProvider from '@/contexts/ThemeContext';
import Index from '@/index';
import '@/services/calendarConfig';
import {AppProvider} from '@realm/react';

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
      <AppProvider id="application-0-fcyzd">
        <UserContextProvider>
          <Index />
        </UserContextProvider>
      </AppProvider>
    </ThemeContextProvider>
  );
};

export default App;
