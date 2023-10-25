import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"
import { getGoogleCredentials } from "../../utils/getGoogleCredentials"
import { Realm, useApp } from "@realm/react"



export default function useLogin() {
    const app = useApp()

    const [isSingInGoogleLoading, setIsSingInGoogleLoading] = useState(false)
    const [isSingInAnonymousLoading, setIsSingInAnonymousLoading] = useState(false)

    const singInGoogle = async () => {
        setIsSingInGoogleLoading(true)
        try {
            const googleCredentials = await getGoogleCredentials()
            if (googleCredentials) {
                await app.logIn(googleCredentials)
            }
        } catch (error) {
            console.log('Singin with google error => ' + error)
        } finally {
            setIsSingInGoogleLoading(false)
        }

    }
    const singInAnonymous = async () => {
        setIsSingInAnonymousLoading(true)
        try {
            await app.logIn(Realm.Credentials.anonymous())
        } catch (error) {
            console.log('Singin with anonymous error => ' + error)
        } finally {
            setIsSingInAnonymousLoading(false)
        }
    }


    return {
        singInGoogle,
        singInAnonymous,
        isSingInAnonymousLoading,
        isSingInGoogleLoading
    }
}