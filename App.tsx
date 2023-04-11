import React from 'react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';
import './src/services/calendarConfig'
import RealmProvider from './src/contexts/RealmContext';
import { Provider } from 'react-redux';
import { store } from './src/store';


const App = () => {

  return (
    <RealmProvider>
      <ThemeContextProvider>
        <Provider store={store}>
          <Index />
        </Provider>
      </ThemeContextProvider>
    </RealmProvider>

  )
}

export default App;