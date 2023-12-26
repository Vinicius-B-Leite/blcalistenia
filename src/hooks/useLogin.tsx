import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {getGoogleCredentials} from '@/utils';
import {Realm, useApp} from '@realm/react';

export default function useLogin() {
  const app = useApp();

  const [isSingInGoogleLoading, setIsSingInGoogleLoading] = useState(false);
  const [isSingInAnonymousLoading, setIsSingInAnonymousLoading] =
    useState(false);

  const singInGoogle = async () => {
    setIsSingInGoogleLoading(true);
    try {
      const googleCredentials = await getGoogleCredentials();
      if (googleCredentials) {
        await app.logIn(googleCredentials);
      }
    } catch (error) {
      console.log('Singin with google error => ' + error);
    } finally {
      setIsSingInGoogleLoading(false);
    }
  };
  const singInAnonymous = async () => {
    setIsSingInAnonymousLoading(true);
    try {
      await app.logIn(Realm.Credentials.anonymous());
    } catch (error) {
      console.log('Singin with anonymous error => ' + error);
    } finally {
      setIsSingInAnonymousLoading(false);
    }
  };
  const logout = async () => {
    await Promise.all([app.currentUser?.logOut(), GoogleSignin.signOut()]);
  };
  const singUp = async () => {
    try {
      const googleCredentials = await getGoogleCredentials();
      if (googleCredentials) {
        await app.currentUser?.linkCredentials(googleCredentials);
      }
    } catch (error) {
      console.log('SingUp with google error => ' + error);
    }
  };

  return {
    singInGoogle,
    singInAnonymous,
    isSingInAnonymousLoading,
    isSingInGoogleLoading,
    logout,
    singUp,
  };
}
