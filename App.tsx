import React from 'react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';
import './src/services/calendarConfig'
import { AppProvider } from '@realm/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({
  webClientId: "80963280941-oncq7jrtuj5b4slm20okbhtonvvc211t.apps.googleusercontent.com",
});


const App = () => {

  return (
    <ThemeContextProvider>
      <AppProvider id='application-0-fcyzd'>
        <Index />
      </AppProvider>
    </ThemeContextProvider>
  )
}


export default App;