import { ActivityIndicator } from 'react-native'
import * as S from './styles'
import { useTheme } from "styled-components/native"
import useLogin from './useLogin'



export default function Login() {
    const theme = useTheme()
    const { isSingInAnonymousLoading, isSingInGoogleLoading, singInAnonymous, singInGoogle } = useLogin()


    return (
        <S.Container>
            <S.ImageBG source={require('../../assets/loginBackground.png')} />

            <S.Logo source={require('../../assets/logo.png')} />

            <S.Button bgTransparent={false} onPress={singInGoogle}>
                {
                    isSingInGoogleLoading ?
                        <ActivityIndicator size={theme.sizes.icons.sm} color={theme.colors.text} />
                        :
                        <S.ButtonText bgTransparent={false}>Entrar com Google</S.ButtonText>
                }
            </S.Button>

            <S.Button bgTransparent={true} onPress={singInAnonymous}>
                {
                    isSingInAnonymousLoading ?
                        <ActivityIndicator size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                        :
                        <S.ButtonText bgTransparent={true}>Entrar como anônimo</S.ButtonText>
                }
            </S.Button>
        </S.Container>
    )
} 