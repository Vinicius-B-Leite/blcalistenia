import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const getGoogleCredentials = async () => {
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