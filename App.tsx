import React, {useEffect} from 'react';
import ThemeContextProvider from '@/contexts/ThemeContext';
import Index from '@/index';
import '@/services/calendarConfig';
import {AppProvider} from '@realm/react';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeContextProvider>
      <AppProvider id="application-0-fcyzd">
        <Index />
      </AppProvider>
    </ThemeContextProvider>
  );
};

export default App;
