import Realm from 'realm'
import React, { useContext, useState } from 'react';
import * as S from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Models';
import { pickeImage } from '../../utils/pickImage';
import FastImage from 'react-native-fast-image';
import ThemeSelect from '../../components/ThemeSelect';
import ChangeUsername from '../../components/ChangeUsername';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from "@react-native-google-signin/google-signin";
import { useApp, useUser } from '@realm/react';
import { getGoogleCredentials } from '../../utils/getGoogleCredentials';


type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>
GoogleSignin.configure({
    webClientId: "80963280941-oncq7jrtuj5b4slm20okbhtonvvc211t.apps.googleusercontent.com",
});


const Profile: React.FC<NavigationProps> = ({ navigation }) => {

    const theme = useTheme()
    const [showThemeSelect, setShowThemeSelect] = useState(false)
    const [showChangeUsername, setShowChangeUsername] = useState(false)
    const app = useApp()
    const user = useUser()

    const handlePickImage = async () => {
        const image = await pickeImage()
        if (image.assets && image.assets[0].uri) {
            user.profile.picture = image.assets[0].uri
        }
    }



    const singUp = async () => {
        try {
            const googleCredentials = await getGoogleCredentials()
            if (googleCredentials) {
                await app.currentUser?.linkCredentials(googleCredentials)
            }
        } catch (error) {
            console.log('SingUp with google error => ' + error)
        }
    }

    const logout = async () => {
        await Promise.all([
            app.currentUser?.logOut(),
            GoogleSignin.signOut()
        ])
    }

    return (
        <S.Container>
            <S.Header onPressIn={() => navigation.goBack()}>
                <S.Title>{'<  '}Perfil</S.Title>
            </S.Header>
            <S.ButtonChangeImage onPressIn={handlePickImage}>
                <S.Avatar
                    source={{
                        uri: user.profile.picture as string || 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg',
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </S.ButtonChangeImage>
            <S.Username>{user.profile.name || 'Desconhecido'}</S.Username>

            <S.OptionContainer onPressIn={() => setShowChangeUsername(true)}>
                <S.Left>
                    <Feather name='user' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Nome de usuário</S.OptionTitle>
            </S.OptionContainer>
            <S.OptionContainer onPressIn={() => setShowThemeSelect(true)}>
                <S.Left>
                    <Feather name='sun' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Tema</S.OptionTitle>
            </S.OptionContainer>



            <S.OptionContainer onPress={singUp}>
                <S.Left>
                    <Feather name='upload-cloud' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Sincronizar na nuvem</S.OptionTitle>
            </S.OptionContainer>


            <S.OptionContainer onPress={logout}>
                <S.Left>
                    <Feather name='log-out' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Sair da conta</S.OptionTitle>
            </S.OptionContainer>

            <ChangeUsername visible={showChangeUsername} onRequestClose={() => setShowChangeUsername(false)} animationType='slide' transparent />
            <ThemeSelect transparent animationType='fade' visible={showThemeSelect} onRequestClose={() => setShowThemeSelect(false)} />
        </S.Container>
    )
}

export default Profile;