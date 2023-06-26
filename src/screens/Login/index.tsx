import { Realm, useApp } from "@realm/react"
import { ActivityIndicator } from 'react-native'
import { getGoogleCredentials } from "../../utils/getGoogleCredentials"
import * as S from './styles'
import { useState } from "react"
import { useTheme } from "styled-components/native"


export default function Login() {
    const app = useApp()
    const theme = useTheme()
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


    return (
        <S.Container>
            <S.ImageBG source={require('../../assets/loginBackground.png')} />

            <S.Logo source={require('../../assets/logo.png')} />

            <S.Button bgTransparent={false} onPress={singInGoogle}>
                {
                    isSingInGoogleLoading ?
                        <ActivityIndicator size={theme.sizes.icons.sm} color={theme.colors.text} /> :
                        <S.ButtonText bgTransparent={false}>Entrar com Google</S.ButtonText>
                }
            </S.Button>

            <S.Button bgTransparent={true} onPress={singInAnonymous}>
                {
                    isSingInAnonymousLoading ?
                        <ActivityIndicator size={theme.sizes.icons.sm} color={theme.colors.contrast} /> :
                        <S.ButtonText bgTransparent={true}>Entrar como anônimo</S.ButtonText>
                }
            </S.Button>
        </S.Container>
    )
} 