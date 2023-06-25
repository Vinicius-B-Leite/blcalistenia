import React, { useEffect } from 'react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import Index from './src';
import { Button } from 'react-native'
import './src/services/calendarConfig'
import { Provider } from 'react-redux';
import { store } from './src/store';
import { AppProvider, UserProvider, useApp } from '@realm/react';
import { RealmProvider } from './src/services/realm';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';



const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: Partial<Realm.SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
  onError: console.log,
  
}

const App = () => {

  return (
    <AppProvider id='application-0-fcyzd'>
      <UserProvider fallback={<Login />}>
        <RealmProvider sync={syncConfig}>
          <ThemeContextProvider>
            <Provider store={store}>
              <Index />
            </Provider>
          </ThemeContextProvider>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  )
}

function Login() {


  const app = useApp()

  const getGoogleCredentials = async () => {
    try {

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      if (!idToken) {
        return
      }
      const credential = Realm.Credentials.jwt(idToken)
      return credential
    } catch (error) {
      throw error
    }
  }



  const singIn = async () => {
    try {
      const googleCredentials = await getGoogleCredentials()
      if (googleCredentials) {
        await app.logIn(googleCredentials)
      }
    } catch (error) {
      console.log('Singin with google error => ' + error)
    }
  }


  return <View style={{ flex: 1, backgroundColor: 'red' }}>
    <Button onPress={singIn} title='entrar'/>
  </View>
}

export default App;