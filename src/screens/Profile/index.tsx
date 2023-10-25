import Realm from 'realm'
import React, { useState } from 'react';
import * as S from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Models';
import FastImage from 'react-native-fast-image';
import ThemeSelect from '../../components/ThemeSelect';
import ChangeUsername from '../../components/ChangeUsername';
import useLogin from '@/hooks/useLogin';
import useProfile from './useProfile';


type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>


const Profile: React.FC<NavigationProps> = ({ navigation }) => {

    const theme = useTheme()
    const [showThemeSelect, setShowThemeSelect] = useState(false)


    const { logout, singUp } = useLogin()
    const { handleChangeName, handlePickImage, showChangeUsername, user, userRealm, openChangeUsernameModal, closeChangeUsernameModal } = useProfile()





    return (
        <S.Container>
            <S.Header onPressIn={() => navigation.goBack()}>
                <S.Title>{'<  '}Perfil</S.Title>
            </S.Header>
            <S.ButtonChangeImage onPressIn={handlePickImage}>
                <S.Avatar
                    source={{
                        uri: user?.avatar as string || 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg',
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </S.ButtonChangeImage>
            <S.Username>{user?.username as string || 'Desconhecido'}</S.Username>

            <S.OptionContainer onPressIn={openChangeUsernameModal}>
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


            {
                !(userRealm.profile.name) &&

                <S.OptionContainer onPress={singUp}>
                    <S.Left>
                        <Feather name='upload-cloud' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                    </S.Left>
                    <S.OptionTitle>Sincronizar na nuvem</S.OptionTitle>
                </S.OptionContainer>
            }


            <S.OptionContainer onPress={logout}>
                <S.Left>
                    <Feather name='log-out' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Sair da conta</S.OptionTitle>
            </S.OptionContainer>

            <ChangeUsername
                visible={showChangeUsername}
                onRequestClose={closeChangeUsernameModal}
                animationType='slide'
                transparent
                changeName={(newName) => handleChangeName(newName)}
            />
            <ThemeSelect transparent animationType='fade' visible={showThemeSelect} onRequestClose={() => setShowThemeSelect(false)} />
        </S.Container>
    )
}

export default Profile;